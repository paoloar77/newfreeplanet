import { defineComponent } from 'vue'

import {
  IMessage,
} from '@model'

import './messagePopover.scss'
import { tools } from '@src/store/Modules/tools'

import { useRouter } from 'vue-router'
import MixinUsers from '../../../mixins/mixin-users'

const namespace = 'MessageModule'

export default defineComponent({
  name: 'MessagePopover',

  setup(props) {
    const $router = useRouter()
    // function lasts_messages (state: IUserState) => IMessage[] {
    //
    // }

    function lasts_messages() {
      // ++Todo: lasts_messages
      return []
    }

    // if (GlobalStore.state.posts.length < 1) {
    //   this.requestPosts()
    // }
    function created() {}

    function clickChat(msg: IMessage) {
      // $router.replace(`/messages/${ msg.dest.username}`)
    }

    function getNumNotifUnread() {
      return 0
    }

    function randomDate(): Date {
      const myval = Math.floor(Math.random() * 10000000000)
      return tools.getstrDateTime(new Date(tools.getTimestampsNow() - myval))
    }

    function randomAvatarUrl() {
      // return `https://api.adorable.io/avatars/face/${this.randomEye()}/${this.randomNose()}/${this.randomMouth()}/${this.randomHexColor()}`
    }

    function randomHexColor() {
      return Math.random().toString(16).slice(2, 8)
    }

    function randomArrayElement(array: any) {
      return array[Math.floor((Math.random() * array.length))]
    }

    /*
    function randomEye() {
      return this.randomArrayElement(['eyes1', 'eyes10', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes9'])
    }

    function randomNose() {
      return this.randomArrayElement(['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8', 'nose9'])
    }

    function randomMouth() {
      return this.randomArrayElement(['mouth1', 'mouth10', 'mouth11', 'mouth3', 'mouth5', 'mouth6', 'mouth7', 'mouth9'])
    }

     */

    return {
      lasts_messages,
      clickChat,
    }
  },
})
