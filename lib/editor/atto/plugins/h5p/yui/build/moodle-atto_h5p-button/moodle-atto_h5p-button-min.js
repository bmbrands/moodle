YUI.add("moodle-atto_h5p-button",function(e,t){var n={CONTENTWARNING:"att_h5p_contentwarning",H5PBROWSER:"openh5pbrowser",INPUTALT:"atto_h5p_altentry",INPUTH5PFILE:"atto_h5p_file",INPUTH5PURL:"atto_h5p_url",INPUTSUBMIT:"atto_h5p_urlentrysubmit",OPTION_ALLOW_DOWNLOAD:"atto_h5p_option_allow_download",OPTION_COPYRIGHT_BUTTON:"atto_h5p_option_copyright_button",OPTION_DISPLAY_BUTTONS:"atto_h5p_option_display_buttons",OPTION_EMBED_BUTTON:"atto_h5p_option_embed_button",URLWARNING:"atto_h5p_warning"},r={CONTENTWARNING:"."+n.CONTENTWARNING,H5PBROWSER:"."+n.H5PBROWSER,INPUTH5PFILE:"."+n.INPUTH5PFILE,INPUTH5PURL:"."+n.INPUTH5PURL,INPUTSUBMIT:"."+n.INPUTSUBMIT,OPTION_ALLOW_DOWNLOAD:"."+n.OPTION_ALLOW_DOWNLOAD,OPTION_COPYRIGHT_BUTTON:"."+n.OPTION_COPYRIGHT_BUTTON,OPTION_DISPLAY_BUTTONS:"."+n.OPTION_DISPLAY_BUTTONS,OPTION_EMBED_BUTTON:"."+n.OPTION_EMBED_BUTTON,URLWARNING:"."+n.URLWARNING},i="atto_h5p",s='<form class="atto_form"><div style="display:none" role="alert" class="alert alert-warning mb-1 {{CSS.CONTENTWARNING}}">{{get_string "noh5pcontent" component}}</div><div style="display:none" role="alert" class="alert alert-warning mb-1 {{CSS.URLWARNING}}">{{get_string "invalidh5purl" component}}</div>{{#if canUploadAndEmbed}}<ul class="nav nav-tabs mb-1" role="tablist"><li class="nav-item"><a class="nav-link active" href="#{{elementid}}_{{CSS.INPUTH5PURL}}" role="tab" data-toggle="tab">{{get_string "h5purl" component}}</a></li><li class="nav-item"><a class="nav-link" href="#{{elementid}}_{{CSS.H5PBROWSER}}" role="tab" data-toggle="tab">{{get_string "h5pfile" component}}</a></li></ul><div class="tab-content"><div class="tab-pane active" id="{{elementid}}_{{CSS.INPUTH5PURL}}">{{/if}}{{#if canEmbed}}<div class="mb-4"><label for="{{elementid}}_{{CSS.INPUTH5PURL}}">{{get_string "enterurl" component}}</label><input class="form-control fullwidth {{CSS.INPUTH5PURL}}" type="url" id="{{elementid}}_{{CSS.INPUTH5PURL}}" size="32"/></div>{{/if}}{{#if canUploadAndEmbed}}</div><div class="tab-pane" id="{{elementid}}_{{CSS.H5PBROWSER}}">{{/if}}{{#if canUpload}}<div class="mb-4"><label for="{{elementid}}_{{CSS.H5PBROWSER}}">{{get_string "enterurl" component}}</label><div class="input-group input-append w-100"><input class="form-control {{CSS.INPUTH5PFILE}}" type="url" id="{{elementid}}_{{CSS.INPUTH5PFILE}}" size="32"/><span class="input-group-append"><button class="btn btn-secondary {{CSS.H5PBROWSER}}" type="button">{{get_string "browserepositories" component}}</button></span></div><div class="mt-2 mb-1">{{get_string "h5poptions" component}}</div><div class="form-check"><input type="checkbox" checked="true" class="form-check-input {{CSS.OPTION_DISPLAY_BUTTONS}}"id="{{elementid}}_h5p-option-display-buttons"/><label class="form-check-label" for="{{elementid}}_h5p-option-display-buttons">{{get_string "displaybuttons" component}}</label></div><div class="form-check"><input type="checkbox" checked="true" class="form-check-input check-depend {{CSS.OPTION_ALLOW_DOWNLOAD}}"id="{{elementid}}_h5p-option-allow-download"/><label class="form-check-label" for="{{elementid}}_h5p-option-allow-download">{{get_string "allowdownload" component}}</label></div><div class="form-check"><input type="checkbox" checked="true" class="form-check-input check-depend {{CSS.OPTION_EMBED_BUTTON}}" id="{{elementid}}_h5p-option-embed-button"/><label class="form-check-label" for="{{elementid}}_h5p-option-embed-button">{{get_string "embedbutton" component}}</label></div><div class="form-check"><input type="checkbox" checked="true" class="form-check-input check-depend {{CSS.OPTION_COPYRIGHT_BUTTON}}" id="{{elementid}}_h5p-option-copyright-button"/><label class="form-check-label" for="{{elementid}}_h5p-option-copyright-button">{{get_string "copyrightbutton" component}}</label></div></div>{{/if}}{{#if canUploadAndEmbed}}</div></div>{{/if}}<div class="text-center"><button class="btn btn-secondary {{CSS.INPUTSUBMIT}}" type="submit">{{get_string "saveh5p" component}}</button></div></form>',o='<div class="position-relative h5p-embed-placeholder"><div class="attoh5poverlay"></div><iframe id="h5pcontent" class="h5pcontent" src="{{url}}/embed" width="100%" height="637" frameborder="0"allowfullscreen="{{allowfullscreen}}" allowmedia="{{allowmedia}}"></iframe><script src="'+M.cfg.wwwroot+'/lib/editor/atto/plugins/h5p/js/h5p-resizer.js"'+'charset="UTF-8"></script>'+"</div>"+"</div>"+"<p><br></p>",u='<embed src="" class="h5p-file-placeholder" data-h5p-file="{{h5pfile}}"{{#if optionDisplayButtons}} data-option-display-buttons="1" {{/if}}{{#if optionAllowDownload}} data-option-allow-download="1" {{/if}}{{#if optionEmbedButton}} data-option-embed-button="1" {{/if}}{{#if optionCopyrightButton}} data-option-copyright-button="1" {{/if}}><p><br></p>';e.namespace("M.atto_h5p").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_form:null,_allowedmethods:"none",initializer:function(){this._allowedmethods=this.get("allowedmethods");if(this._allowedmethods==="none")return;this.addButton({icon:"icon",iconComponent:"atto_h5p",callback:this._displayDialogue,tags:"h5p",tagMatchRequiresAll:!1})},_displayDialogue:function(){this._currentSelection=this.get("host").getSelection();if(this._currentSelection===!1)return;var e=this.getDialogue({headerContent:M.util.get_string("h5pproperties",i),width:"auto",focusAfterHide:!0,focusOnShowSelector:r.INPUTH5PURL});e.set("bodyContent",this._getDialogueContent()).show()},_getDialogueContent:function(){var t=!1,o=!1,u=!1;this.get("host").canShowFilepicker("h5p")&&(this._allowedmethods==="both"&&(u=!0,t=!0),this._allowedmethods==="upload"&&(t=!0));if(this._allowedmethods==="both"||this._allowedmethods==="embed")o=!0;var a=e.Handlebars.compile(s),f=e.Node.create(a({elementid:this.get("host").get("elementid"),CSS:n,component:i,canUpload:t,canEmbed:o,canUploadAndEmbed:u}));return this._form=f,this._form.one(r.INPUTSUBMIT).on("click",this._setH5P,this),t&&(this._form.one(r.H5PBROWSER).on("click",function(){this.get("host"
).showFilepicker("h5p",this._filepickerCallback,this)},this),this._form.one(r.OPTION_DISPLAY_BUTTONS).on("change",function(){this._form.one(r.OPTION_DISPLAY_BUTTONS).get("checked")||this._form.all(".check-depend").set("checked",!1)},this)),o&&t&&(this._form.one(r.INPUTH5PFILE).on("change",function(){this._form.one(r.INPUTH5PURL).set("value",""),this._form.one(r.URLWARNING).setStyle("display","none"),this._form.one(r.CONTENTWARNING).setStyle("display","none")},this),this._form.one(r.INPUTH5PURL).on("change",function(){this._form.one(r.INPUTH5PFILE).set("value",""),this._form.one(r.URLWARNING).setStyle("display","none"),this._form.one(r.CONTENTWARNING).setStyle("display","none")},this)),f},_filepickerCallback:function(e){if(e.url!==""){var t=this._form.one(r.INPUTH5PFILE);t.set("value",e.url)}},_setH5P:function(t){var n=this._form,i,s=this.get("host"),a,f;if(this._allowedmethods==="both"||this._allowedmethods==="embed")f=n.one(r.INPUTH5PURL).get("value");if(this._allowedmethods==="both"||this._allowedmethods==="upload")a=n.one(r.INPUTH5PFILE).get("value");t.preventDefault();if(this._updateWarning())return;s.focus();if(f!==""){s.setSelection(this._currentSelection);var l=e.Handlebars.compile(o);i=l({url:f,allowfullscreen:"allowfullscreen",allowmedia:"geolocation *; microphone *; camera *; midi *; encrypted-media *"}),this.get("host").insertContentAtFocusPoint(i),this.markUpdated()}else if(a!==""){var c=n.one(r.OPTION_DISPLAY_BUTTONS).get("checked"),h=n.one(r.OPTION_ALLOW_DOWNLOAD).get("checked"),p=n.one(r.OPTION_EMBED_BUTTON).get("checked"),d=n.one(r.OPTION_COPYRIGHT_BUTTON).get("checked");s.setSelection(this._currentSelection);var v=e.Handlebars.compile(u);i=v({h5pfile:a,allowfullscreen:"allowfullscreen",optionDisplayButtons:c,optionAllowDownload:h,optionEmbedButton:p,optionCopyrightButton:d}),this.get("host").insertContentAtFocusPoint(i),this.markUpdated()}this.getDialogue({focusAfterHide:null}).hide()},_validURL:function(e){var t=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*");return!!t.test(e)},_updateWarning:function(){var e=this._form,t=!0,n,i;if(this._allowedmethods==="both"||this._allowedmethods==="embed"){n=e.one(r.INPUTH5PURL).get("value");if(n!=="")return this._validURL(n)?(e.one(r.URLWARNING).setStyle("display","none"),t=!1):(e.one(r.URLWARNING).setStyle("display","block"),t=!0),t}if(this._allowedmethods==="both"||this._allowedmethods==="upload")i=e.one(r.INPUTH5PFILE).get("value"),i!==""?(e.one(r.CONTENTWARNING).setStyle("display","none"),t=!1):(e.one(r.CONTENTWARNING).setStyle("display","block"),t=!0);return t}},{ATTRS:{allowedmethods:{value:null}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});