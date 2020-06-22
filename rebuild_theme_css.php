<?php

define('CLI_SCRIPT', true);

require_once(__DIR__ . '/config.php');
require_once($CFG->dirroot.'/lib/csslib.php');

// theme_reset_all_caches();

if (!empty($CFG->allowthemechangeonurl) && isset($SESSION->theme)) {
	$themename = $SESSION->theme;
} else {
	$themename = core_useragent::get_device_type_theme(core_useragent::DEVICETYPE_DEFAULT);
}
$theme = theme_config::load($themename);
$themesubrev = theme_get_sub_revision_for_theme($themename);
$rev = theme_get_revision();
$candidatedir = "$CFG->localcachedir/theme/$rev/$themename/css";

echo theme_styles_generate_and_store($theme, $rev, $themesubrev, $candidatedir);

/**
 * Generate the theme CSS and store it.
 *
 * @param   theme_config    $theme The theme to be generated
 * @param   int             $rev The theme revision
 * @param   int             $themesubrev The theme sub-revision
 * @param   string          $candidatedir The directory that it should be stored in
 * @return  string          The path that the primary CSS was written to
 */
function theme_styles_generate_and_store($theme, $rev, $themesubrev, $candidatedir) {
    global $CFG;
    require_once("{$CFG->libdir}/filelib.php");

    // Generate the content first.
    if (!$csscontent = $theme->get_css_cached_content()) {
        if ($rev == '-1') {
            $csscontent = $theme->get_css_content_debug('scss', '', 'sheet');
        } else {
            $csscontent = $theme->get_css_content();
        }
        $theme->set_css_content_cache($csscontent);
    }

    if ($theme->get_rtl_mode()) {
        $type = "all-rtl";
    } else {
        $type = "all";
    }

    // Determine the candidatesheet path.
    $candidatesheet = "{$candidatedir}/" . theme_styles_get_filename($type, $themesubrev, $theme->use_svg_icons());

    // Store the CSS.
    css_store_css($theme, $candidatesheet, $csscontent);

    // Store the fallback CSS in the temp directory.
    // This file is used as a fallback when waiting for a theme to compile and is not versioned in any way.
    $fallbacksheet = make_temp_directory("theme/{$theme->name}")
        . "/"
        . theme_styles_get_filename($type, 0, $theme->use_svg_icons());
    css_store_css($theme, $fallbacksheet, $csscontent);

    // Delete older revisions from localcache.
    $themecachedirs = glob("{$CFG->localcachedir}/theme/*", GLOB_ONLYDIR);
    foreach ($themecachedirs as $localcachedir) {
        $cachedrev = [];
        preg_match("/\/theme\/([0-9]+)$/", $localcachedir, $cachedrev);
        $cachedrev = isset($cachedrev[1]) ? intval($cachedrev[1]) : 0;
        if ($cachedrev > 0 && $cachedrev < $rev) {
            fulldelete($localcachedir);
        }
    }

    // Delete older theme subrevision CSS from localcache.
    $subrevfiles = glob("{$CFG->localcachedir}/theme/{$rev}/{$theme->name}/css/*.css");
    foreach ($subrevfiles as $subrevfile) {
        $cachedsubrev = [];
        preg_match("/_([0-9]+)\.([0-9]+\.)?css$/", $subrevfile, $cachedsubrev);
        $cachedsubrev = isset($cachedsubrev[1]) ? intval($cachedsubrev[1]) : 0;
        if ($cachedsubrev > 0 && $cachedsubrev < $themesubrev) {
            fulldelete($subrevfile);
        }
    }

    return $candidatesheet;
}

/**
 * Get the filename for the specified configuration.
 *
 * @param   string  $type The requested sheet type
 * @param   int     $themesubrev The theme sub-revision
 * @param   bool    $usesvg Whether SVGs are allowed
 * @return  string  The filename for this sheet
 */
function theme_styles_get_filename($type, $themesubrev = 0, $usesvg = true) {
    $filename = $type;
    $filename .= ($themesubrev > 0) ? "_{$themesubrev}" : '';
    $filename .= $usesvg ? '' : '';

    return "{$filename}.css";
}
?>