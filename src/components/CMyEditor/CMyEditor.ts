
import { tools } from '@store/Modules/tools'
import { CTitleBanner } from '../CTitleBanner'

import { defineComponent, ref,  toRef } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'CMyEditor',
  components: { CTitleBanner },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    myclass: {
      type: String,
      required: false,
      default: '',
    },
    showButtons: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar()

    const editor = ref(null)
    const myvalue = toRef(props, 'value')
    const mycolor = ref('')

    const showeditor= ref(true)

    const myfonts = ref({
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana'
    })

    const toolbarcomp = ref([
      ['left', 'center', 'right', 'justify'],
      ['bold', 'italic', 'underline', 'strike'],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: [
            'p',
            'h4',
            'h5',
            'h6',
            'code'
          ]
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7'
          ]
        },
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana'
          ]
        },
        'removeFormat'
      ],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

      ['undo', 'redo', 'viewsource'],
    ])

    function changeval(newval: any) {
      // console.log('changeval', newval)
      emit('update:value', newval)
    }

    function annulla() {
      emit('annulla', true)
    }

    function saveval() {
      // Converti i <b> in <strong>

      myvalue.value = tools.convertiTagHTMLPerBOT(myvalue.value)

      console.log('saveval', myvalue.value)
      emit('showandsave', myvalue.value)
      // emit('update:value', myvalue)
      showeditor.value = false
    }

    function setcolor() {
      document.execCommand('foreColor', false, mycolor.value)
    }

    /**
     * Capture the <CTL-V> paste event, only allow plain-text, no images.
     *
     * see: https://stackoverflow.com/a/28213320
     *
     * @param {object} evt - array of files
     * @author Daniel Thompson-Yvetot
     * @license MIT
     */
    function pasteCapture(evt: any) {
      // let text, onPasteStripFormattingIEPaste
      // evt.preventDefault()
      // if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
      //   text = evt.originalEvent.clipboardData.getData('text/plain')
      //   $refs.editor_ref.runCmd('insertText', text)
      // }
      // else if (evt.clipboardData && evt.clipboardData.getData) {
      //   text = evt.clipboardData.getData('text/plain')
      //   $refs.editor_ref.runCmd('insertText', text)
      // }
      // else if (window.clipboardData && window.clipboardData.getData) {
      //   if (!onPasteStripFormattingIEPaste) {
      //     onPasteStripFormattingIEPaste = true
      //     $refs.editor_ref.runCmd('ms-pasteTextOnly', text)
      //   }
      //   onPasteStripFormattingIEPaste = false
      // }
    }

    return {
      myfonts,
      toolbarcomp,
      editor,
      myvalue,
      mycolor,
      changeval,
      annulla,
      saveval,
      setcolor,
      pasteCapture,
      tools,
    }
  }
})
