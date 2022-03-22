import {reactive} from "vue";
import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItAbbr from 'markdown-it-abbr'
export const  markDownPlugins = reactive([
    {
        plugin: MarkdownItAbbr
    }, {
        plugin: MarkdownItSub
    }, {
        plugin: MarkdownItSup
    }, {
        plugin: MarkdownItDeflist
    }, {
        plugin: MarkdownItEmoji
    }
])