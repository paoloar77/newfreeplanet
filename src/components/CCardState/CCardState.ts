import { defineComponent } from 'vue'

import { tools } from '@store/Modules/tools'

export default defineComponent({
  name: 'CCardState',
  props: {
    myperc: {
      type: Number,
      required: true,
      default: 0,
    },
    mytext: {
      type: String,
      required: false,
      default: '',
    },
    myval: {
      type: Number,
      required: false,
      default: 0,
    },
    imgsrc: {
      type: String,
      required: false,
      default: '',
    },
    isperc: {
      type: Boolean,
      required: false,
      default: false,
    },
    textadd: {
      type: String,
      required: false,
      default: '',
    },
    mycolor: {
      type: String,
      required: false,
      default: 'green',
    },
    size: {
      type: String,
      required: false,
      default: '150px',
    },
    size_mob: {
      type: String,
      required: false,
      default: '130px',
    },
    fontsize: {
      type: String,
      required: false,
      default: '1rem',
    },
    mystyle: {
      type: String,
      required: false,
      default: '',
    },
    myclass: {
      type: String,
      required: false,
      default: 'my-card-stat',
    },
  },
  components: {},
  setup(props) {

    function getsize() {
      if (tools.isMobile())
        return props.size_mob
      else
        return props.size
    }

    return {
      getsize,
    }
  },
})
