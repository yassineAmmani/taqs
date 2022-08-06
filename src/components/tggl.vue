<template>
  <label class="container">
    <!-- <span class="label" v-if="checked2" >{{ label2 }}</span> -->
    <input
      v-bind="$attrs"
      class="input"
      type="checkbox"
      :checked="checked"
      @click="ch"
      @change="$emit('update:checked', $event.target.checked)"
    />
    <span class="switch"></span>
    <span class="label" v-if="!checked2">{{ lang[this.checked2  ? 1 :0 ]}}</span>
  </label>

</template>

<script>
export default {
  name: "tggl-s",
  props: {
    label: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  data(){
    return{
      label2 : '',
      lang: ['french','arabic'],
      checked2: true
    }
  },
  methods:{
    ch(){
      this.checked2 = !this.checked2
      this.label2 = this.lang[this.checked2  ? 1 :0]
    }
  }

}
</script>

<style scoped>
.container {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.label {
  margin-left: 12px;
  color: #1a202c;
  /* Show an ellipsis if the text takes more than one line */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* Visually hide the checkbox input */
.input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.switch {
  --switch-container-width: 50px;
  --switch-size: calc(var(--switch-container-width) / 2);
  --light-gray: #e2e8f0;
  --gray: #cbd5e0;
  --ameracan:#cbd5e0;
  --dark-gray: #c0a0bb;
  --teal: #4fd1c5;
  --dark-teal: #319795;
  /* Vertically center the inner circle */
  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  /* Make the container element rounded */
  border-radius: var(--switch-size);
  background-color: var(--light-gray);
  /* In case the label gets really long, the toggle shouldn't shrink. */
  flex-shrink: 0;
  transition: background-color 0.25s ease-in-out;
}
.switch::before {
  content: "";
  position: absolute;
  /* Move a little bit the inner circle to the right */
  left: 1px;
  height: calc(var(--switch-size) );
  width: calc(var(--switch-size) );
  /* Make the inner circle fully rounded */
  border-radius: 9999px;
  
  background-image: url('../assets/french-flag.png');
  background-size: 120%;
  background-position-y: 50%;
  border: 0px solid var(--light-gray);
  transition: transform 0.375s ease-in-out;
}
.input:checked + .switch {
    background-color: var(--ameracan);
}
.input:checked + .switch::before {
    background-image: url('../assets/american-flag.png');
  /* Move the inner circle to the right */
  transform: translateX(
    calc(var(--switch-container-width) - var(--switch-size))
  );
}

.input:focus + .switch::before {
  border-color: var(--gray);
}
.input:focus:checked + .switch::before {
  background-image: url('../assets/american-flag.png');
}
.input:disabled + .switch {
  background-color: var(--gray);
}
.input:disabled + .switch::before {
   background-image: url('../assets/american-flag.png');
  border-color: red;
}


</style>