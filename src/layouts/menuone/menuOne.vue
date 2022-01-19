<template>
  <div class="no-border" v-if="finishLoading">
    <q-list class="rounded-borders text-primary">
      <div v-for="ind1 in getmenu()" :key="ind1">
        <!--<div class="q-list-header">{{replaceUnderlineToSpace(index)}}</div>-->
        <div v-for="(myitemmenu, ind2) in myroutes" :key="ind2">
          <div v-if="myitemmenu.active">
            <div v-if="myitemmenu.routes2 && myitemmenu.inmenu && tools.visumenu(myitemmenu)">

              <span v-if="myitemmenu.isseparator">
                <q-separator></q-separator>
              </span>
              <span v-else>
                <q-expansion-item
                  :header-inset-level="myitemmenu.level_parent"
                  :content-inset-level="myitemmenu.level_parent"
                  :label="tools.getLabelByItem(myitemmenu)"
                  :icon="myitemmenu.materialIcon"
                  expand-icon-class="my-menu-separat"
                  :header-class="getmymenuclass(myitemmenu)"
                  active-class="my-menu-active">

                    <div v-for="(child2, index) in myitemmenu.routes2" :key="index">
                      <div v-if="child2.active && tools.visumenu(child2)">
                        <span v-if="child2.isseparator">
                          <q-separator></q-separator>
                        </span>
                        <span v-else>
                          <q-expansion-item
                            v-if="!child2.routes2"
                            :to="getroute(child2)"
                            :header-inset-level="child2.level_child"
                            :duration="300"
                            :icon="child2.materialIcon"
                            expand-icon="none"
                            active-class="my-menu-active"
                            expand-icon-class="my-menu-icon-none"
                            :class="`item item-link drawer-closer cursor-pointer ` + clBase"
                            :label="tools.getLabelByItem(child2)">

                             <q-item-section avatar>

                               <q-avatar v-if="child2.img">
                                 <div :icon="`img:`+child2.img" class="imgicon" style="font-size:2rem;"></div>
                               </q-avatar>
                               <div v-else>
                                <q-avatar
                                  :icon="child2.materialIcon" color="primary" class="clicon"
                                  text-color="white">
                                </q-avatar>
                               </div>
                              </q-item-section>

                              <q-item-section>
                                {{ tools.getLabelByItem(child2) }}
                              </q-item-section>

                          </q-expansion-item>
                          <q-expansion-item
                            v-else
                            :header-inset-level="child2.level_parent"
                            :content-inset-level="child2.level_parent"
                            :label="tools.getLabelByItem(child2)"
                            :icon="child2.materialIcon"
                            expand-icon-class="my-menu-separat"
                            :header-class="getmymenuclass(child2)"
                            active-class="my-menu-active">

                              <div v-for="(child3, index) in child2.routes2" :key="index">
                                <div v-if="child3.active">
                                  <q-expansion-item
                                    :to="getroute(child3)"
                                    :header-inset-level="child3.level_child"
                                    :duration="300"
                                    :icon="child3.materialIcon"
                                    active-class="my-menu-active"
                                    expand-icon-class="my-menu-icon-none"
                                    :class="`item item-link drawer-closer cursor-pointer ` + clBase"
                                    :label="tools.getLabelByItem(child3)">
                                    <div v-for="(child4, index) in child3.routes2" :key="index">
                                      <q-expansion-item
                                        v-if="!!child3.routes2 && child3.active"
                                        :key="index"
                                        :to="getroute(child4)"
                                        :header-inset-level="child4.level_child"
                                        :duration="300"
                                        :icon="child4.materialIcon"
                                        :expand-icon="child4.icon"
                                        expand-icon-class="my-menu-separat"
                                        active-class="my-menu-active"
                                        :class="`item item-link drawer-closer cursor-pointer ` + clBase"
                                        :label="tools.getLabelByItem(child4)">
                                      </q-expansion-item>
                                    </div>
                                  </q-expansion-item>
                                </div>
                              </div>
                          </q-expansion-item>
                        </span>
                      </div>
                    </div>
                </q-expansion-item>
              </span>
            </div>
            <div v-else>
              <div v-if="myitemmenu.inmenu && !myitemmenu.submenu && tools.visumenu(myitemmenu)">
                <q-slide-transition :duration=200>
                  <div v-show="true">
                  <span v-if="myitemmenu.isseparator">
                    <q-separator inset></q-separator>
                  </span>
                    <span v-else>
                    <q-expansion-item
                      :to="getroute(myitemmenu)"
                      :header-inset-level="myitemmenu.level_parent"
                      :content-inset-level="myitemmenu.level_parent"
                      :label="tools.getLabelByItem(myitemmenu)"
                      :icon="myitemmenu.materialIcon"
                      expand-icon="none"
                      :header-class="clBase"
                      active-class="my-menu-active">
                    </q-expansion-item>
                  </span>
                  </div>
                </q-slide-transition>

              </div>
            </div>
          </div>
        </div>
      </div>
    </q-list>
  </div>
</template>

<script lang="ts" src="./menuOne.ts">
</script>

<style lang="scss">
@import './menuOne.scss';
</style>
