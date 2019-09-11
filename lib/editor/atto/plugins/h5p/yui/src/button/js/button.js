// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_h5p
 * @copyright  2019 Bas Brands  <bas@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_h5p-button
 */

/**
 * Atto h5p content tool.
 *
 * @namespace M.atto_h5p
 * @class Button
 * @extends M.editor_atto.EditorPlugin
 */

var CSS = {
        CONTENTWARNING: 'att_h5p_contentwarning',
        H5PBROWSER: 'openh5pbrowser',
        INPUTALT: 'atto_h5p_altentry',
        INPUTH5PFILE: 'atto_h5p_file',
        INPUTH5PURL: 'atto_h5p_url',
        INPUTSUBMIT: 'atto_h5p_urlentrysubmit',
        OPTION_ALLOW_DOWNLOAD: 'atto_h5p_option_allow_download',
        OPTION_COPYRIGHT_BUTTON: 'atto_h5p_option_copyright_button',
        OPTION_DISPLAY_BUTTONS: 'atto_h5p_option_display_buttons',
        OPTION_EMBED_BUTTON: 'atto_h5p_option_embed_button',
        URLWARNING: 'atto_h5p_warning'
    },
    SELECTORS = {
        CONTENTWARNING: '.' + CSS.CONTENTWARNING,
        H5PBROWSER: '.' + CSS.H5PBROWSER,
        INPUTH5PFILE: '.' + CSS.INPUTH5PFILE,
        INPUTH5PURL: '.' + CSS.INPUTH5PURL,
        INPUTSUBMIT: '.' + CSS.INPUTSUBMIT,
        OPTION_ALLOW_DOWNLOAD: '.' + CSS.OPTION_ALLOW_DOWNLOAD,
        OPTION_COPYRIGHT_BUTTON: '.' + CSS.OPTION_COPYRIGHT_BUTTON,
        OPTION_DISPLAY_BUTTONS: '.' + CSS.OPTION_DISPLAY_BUTTONS,
        OPTION_EMBED_BUTTON: '.' + CSS.OPTION_EMBED_BUTTON,
        URLWARNING: '.' + CSS.URLWARNING
    },

    COMPONENTNAME = 'atto_h5p',

    TEMPLATE = '' +
            '<form class="atto_form">' +
                '<div style="display:none" role="alert" class="alert alert-warning mb-1 {{CSS.CONTENTWARNING}}">' +
                    '{{get_string "noh5pcontent" component}}' +
                '</div>' +
                '<div style="display:none" role="alert" class="alert alert-warning mb-1 {{CSS.URLWARNING}}">' +
                    '{{get_string "invalidh5purl" component}}' +
                '</div>' +
                '{{#if canUploadAndEmbed}}' +
                '<ul class="nav nav-tabs mb-1" role="tablist">' +
                    '<li class="nav-item">' +
                        '<a class="nav-link active" href="#{{elementid}}_{{CSS.INPUTH5PURL}}" role="tab" data-toggle="tab">' +
                            '{{get_string "h5purl" component}}' +
                        '</a>' +
                    '</li>' +
                    '<li class="nav-item">' +
                        '<a class="nav-link" href="#{{elementid}}_{{CSS.H5PBROWSER}}" role="tab" data-toggle="tab">' +
                            '{{get_string "h5pfile" component}}' +
                        '</a>' +
                    '</li>' +
                '</ul>' +
                '<div class="tab-content">' +
                    '<div class="tab-pane active" id="{{elementid}}_{{CSS.INPUTH5PURL}}">' +
                '{{/if}}' +
                '{{#if canEmbed}}' +
                '<div class="mb-4">' +
                    '<label for="{{elementid}}_{{CSS.INPUTH5PURL}}">{{get_string "enterurl" component}}</label>' +
                    '<input class="form-control fullwidth {{CSS.INPUTH5PURL}}" type="url" ' +
                    'id="{{elementid}}_{{CSS.INPUTH5PURL}}" size="32"/>' +
                '</div>' +
                '{{/if}}' +
                '{{#if canUploadAndEmbed}}' +
                    '</div>' +
                    '<div class="tab-pane" id="{{elementid}}_{{CSS.H5PBROWSER}}">' +
                '{{/if}}' +
                '{{#if canUpload}}' +
                '<div class="mb-4">' +
                    '<label for="{{elementid}}_{{CSS.H5PBROWSER}}">{{get_string "enterurl" component}}</label>' +
                    '<div class="input-group input-append w-100">' +
                        '<input class="form-control {{CSS.INPUTH5PFILE}}" type="url" ' +
                        'id="{{elementid}}_{{CSS.INPUTH5PFILE}}" size="32"/>' +
                        '<span class="input-group-append">' +
                            '<button class="btn btn-secondary {{CSS.H5PBROWSER}}" type="button">' +
                            '{{get_string "browserepositories" component}}</button>' +
                        '</span>' +
                    '</div>' +
                    '<div class="mt-2 mb-1">{{get_string "h5poptions" component}}</div>' +
                    '<div class="form-check">' +
                        '<input type="checkbox" checked="true" ' +
                        'class="form-check-input {{CSS.OPTION_DISPLAY_BUTTONS}}"' +
                        'id="{{elementid}}_h5p-option-display-buttons"/>' +
                        '<label class="form-check-label" for="{{elementid}}_h5p-option-display-buttons">' +
                        '{{get_string "displaybuttons" component}}' +
                        '</label>' +
                    '</div>' +
                    '<div class="form-check">' +
                        '<input type="checkbox" checked="true" ' +
                        'class="form-check-input check-depend {{CSS.OPTION_ALLOW_DOWNLOAD}}"' +
                        'id="{{elementid}}_h5p-option-allow-download"/>' +
                        '<label class="form-check-label" for="{{elementid}}_h5p-option-allow-download">' +
                        '{{get_string "allowdownload" component}}' +
                        '</label>' +
                    '</div>' +
                    '<div class="form-check">' +
                        '<input type="checkbox" checked="true" ' +
                        'class="form-check-input check-depend {{CSS.OPTION_EMBED_BUTTON}}" ' +
                            'id="{{elementid}}_h5p-option-embed-button"/>' +
                        '<label class="form-check-label" for="{{elementid}}_h5p-option-embed-button">' +
                        '{{get_string "embedbutton" component}}' +
                        '</label>' +
                    '</div>' +
                    '<div class="form-check">' +
                        '<input type="checkbox" checked="true" ' +
                        'class="form-check-input check-depend {{CSS.OPTION_COPYRIGHT_BUTTON}}" ' +
                            'id="{{elementid}}_h5p-option-copyright-button"/>' +
                        '<label class="form-check-label" for="{{elementid}}_h5p-option-copyright-button">' +
                        '{{get_string "copyrightbutton" component}}' +
                        '</label>' +
                    '</div>' +
                '</div>' +
                '{{/if}}' +
                '{{#if canUploadAndEmbed}}' +
                    '</div>' +
                '</div>' +
                '{{/if}}' +
                '<div class="text-center">' +
                '<button class="btn btn-secondary {{CSS.INPUTSUBMIT}}" type="submit">' + '' +
                    '{{get_string "saveh5p" component}}</button>' +
                '</div>' +
            '</form>',

        H5PEXTERNAL = '' +
            '<div class="position-relative h5p-embed-placeholder">' +
                '<div class="attoh5poverlay"></div>' +
                '<iframe id="h5pcontent" class="h5pcontent" src="{{url}}/embed" ' +
                    'width="100%" height="637" frameborder="0"' +
                    'allowfullscreen="{{allowfullscreen}}" allowmedia="{{allowmedia}}">' +
                '</iframe>' +
                '<script src="' + M.cfg.wwwroot + '/lib/editor/atto/plugins/h5p/js/h5p-resizer.js"' +
                    'charset="UTF-8"></script>' +
                '</div>' +
            '</div>' +
            '<p><br></p>',

        H5PFILE = '' +
            '<embed src="" class="h5p-file-placeholder" ' +
                'data-h5p-file="{{h5pfile}}"' +
                '{{#if optionDisplayButtons}} data-option-display-buttons="1" {{/if}}' +
                '{{#if optionAllowDownload}} data-option-allow-download="1" {{/if}}' +
                '{{#if optionEmbedButton}} data-option-embed-button="1" {{/if}}' +
                '{{#if optionCopyrightButton}} data-option-copyright-button="1" {{/if}}' +
                '>' +
            '<p><br></p>';

Y.namespace('M.atto_h5p').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    /**
     * A reference to the currently open form.
     *
     * @param _form
     * @type Node
     * @private
     */
    _form: null,

    /**
     * Allowed methods of adding H5P.
     *
     * @param _allowedmethods
     * @type String
     * @private
     */
    _allowedmethods: 'none',

    initializer: function() {
        this._allowedmethods = this.get('allowedmethods');
        if (this._allowedmethods === 'none') {
            // Plugin not available here.
            return;
        }
        this.addButton({
            icon: 'icon',
            iconComponent: 'atto_h5p',
            callback: this._displayDialogue,
            tags: 'h5p',
            tagMatchRequiresAll: false
        });
    },

    /**
     * Display the h5p editing tool.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function() {
        // Store the current selection.
        this._currentSelection = this.get('host').getSelection();
        if (this._currentSelection === false) {
            return;
        }
        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('h5pproperties', COMPONENTNAME),
            width: 'auto',
            focusAfterHide: true,
            focusOnShowSelector: SELECTORS.INPUTH5PURL
        });

        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent())
                .show();
    },

    /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getDialogueContent: function() {
        var canUpload = false,
            canEmbed = false,
            canUploadAndEmbed = false;
        if (this.get('host').canShowFilepicker('h5p')) {
            if (this._allowedmethods === 'both') {
                canUploadAndEmbed = true;
                canUpload = true;
            }
            if (this._allowedmethods === 'upload') {
                canUpload = true;
            }
        }

        if (this._allowedmethods === 'both' || this._allowedmethods === 'embed') {
            canEmbed = true;
        }

        var template = Y.Handlebars.compile(TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                component: COMPONENTNAME,
                canUpload: canUpload,
                canEmbed: canEmbed,
                canUploadAndEmbed: canUploadAndEmbed
            }));

        this._form = content;

        // Configure the view of the current h5p.
        this._form.one(SELECTORS.INPUTSUBMIT).on('click', this._setH5P, this);

        if (canUpload) {
            this._form.one(SELECTORS.H5PBROWSER).on('click', function() {
                this.get('host').showFilepicker('h5p', this._filepickerCallback, this);
            }, this);
            this._form.one(SELECTORS.OPTION_DISPLAY_BUTTONS).on('change', function() {
                if (!this._form.one(SELECTORS.OPTION_DISPLAY_BUTTONS).get('checked')) {
                    this._form.all('.check-depend').set('checked', false);
                }
            }, this);
        }

        if (canEmbed && canUpload) {
            this._form.one(SELECTORS.INPUTH5PFILE).on('change', function() {
                this._form.one(SELECTORS.INPUTH5PURL).set('value', '');
                this._form.one(SELECTORS.URLWARNING).setStyle('display', 'none');
                this._form.one(SELECTORS.CONTENTWARNING).setStyle('display', 'none');
            }, this);
            this._form.one(SELECTORS.INPUTH5PURL).on('change', function() {
                this._form.one(SELECTORS.INPUTH5PFILE).set('value', '');
                this._form.one(SELECTORS.URLWARNING).setStyle('display', 'none');
                this._form.one(SELECTORS.CONTENTWARNING).setStyle('display', 'none');
            }, this);
        }

        return content;
    },

    /**
     * Update the dialogue after an h5p was selected in the File Picker.
     *
     * @method _filepickerCallback
     * @param {object} params The parameters provided by the filepicker
     * containing information about the h5p.
     * @private
     */
    _filepickerCallback: function(params) {
        if (params.url !== '') {
            var input = this._form.one(SELECTORS.INPUTH5PFILE);
            input.set('value', params.url);
        }
    },

    /**
     * Update the h5p in the contenteditable.
     *
     * @method _setH5P
     * @param {EventFacade} e
     * @private
     */
    _setH5P: function(e) {
        var form = this._form,
            h5phtml,
            host = this.get('host'),
            h5pfile,
            url;

        if (this._allowedmethods === 'both' || this._allowedmethods === 'embed') {
            url = form.one(SELECTORS.INPUTH5PURL).get('value');
        }

        if (this._allowedmethods === 'both' || this._allowedmethods === 'upload') {
            h5pfile = form.one(SELECTORS.INPUTH5PFILE).get('value');
        }

        e.preventDefault();

        // Check if there are any issues.
        if (this._updateWarning()) {
            return;
        }

        // Focus on the editor in preparation for inserting the h5p.
        host.focus();
        if (url !== '') {
            host.setSelection(this._currentSelection);

            var exttemplate = Y.Handlebars.compile(H5PEXTERNAL);
            h5phtml = exttemplate({
                url: url,
                allowfullscreen: 'allowfullscreen',
                allowmedia: 'geolocation *; microphone *; camera *; midi *; encrypted-media *'
            });

            this.get('host').insertContentAtFocusPoint(h5phtml);

            this.markUpdated();
        } else if (h5pfile !== '') {
            var optionDisplayButtons = form.one(SELECTORS.OPTION_DISPLAY_BUTTONS).get('checked');
            var optionAllowDownload = form.one(SELECTORS.OPTION_ALLOW_DOWNLOAD).get('checked');
            var optionEmbedButton = form.one(SELECTORS.OPTION_EMBED_BUTTON).get('checked');
            var optionCopyrightButton = form.one(SELECTORS.OPTION_COPYRIGHT_BUTTON).get('checked');
            host.setSelection(this._currentSelection);

            var filetemplate = Y.Handlebars.compile(H5PFILE);
            h5phtml = filetemplate({
                h5pfile: h5pfile,
                allowfullscreen: 'allowfullscreen',
                optionDisplayButtons: optionDisplayButtons,
                optionAllowDownload: optionAllowDownload,
                optionEmbedButton: optionEmbedButton,
                optionCopyrightButton: optionCopyrightButton
            });

            this.get('host').insertContentAtFocusPoint(h5phtml);

            this.markUpdated();
        }

        this.getDialogue({
            focusAfterHide: null
        }).hide();

    },

    /**
     * Check if this could be a h5p URL.
     *
     * @method _updateWarning
     * @param {String} str
     * @return {boolean} whether a warning should be displayed.
     * @private
     */
    _validURL: function(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // Protocol.
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name.
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address.
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'); // Port and path.
        return !!pattern.test(str);
    },

    /**
     * Update the url warning.
     *
     * @method _updateWarning
     * @return {boolean} whether a warning should be displayed.
     * @private
     */
    _updateWarning: function() {
        var form = this._form,
            state = true,
            url,
            h5pfile;

        if (this._allowedmethods === 'both' || this._allowedmethods === 'embed') {
            url = form.one(SELECTORS.INPUTH5PURL).get('value');
            if (url !== '') {
                if (this._validURL(url)) {
                    form.one(SELECTORS.URLWARNING).setStyle('display', 'none');
                    state = false;
                } else {
                    form.one(SELECTORS.URLWARNING).setStyle('display', 'block');
                    state = true;
                }
                return state;
            }
        }

        if (this._allowedmethods === 'both' || this._allowedmethods === 'upload') {
            h5pfile = form.one(SELECTORS.INPUTH5PFILE).get('value');
            if (h5pfile !== '') {
                form.one(SELECTORS.CONTENTWARNING).setStyle('display', 'none');
                state = false;
            } else {
                form.one(SELECTORS.CONTENTWARNING).setStyle('display', 'block');
                state = true;
            }
        }

        return state;
    }
}, {
    ATTRS: {
        /**
         * The allowedmethods of adding h5p content.
         *
         * @attribute allowedmethods
         * @type String
         */
        allowedmethods: {
            value: null
        }
    }
});
