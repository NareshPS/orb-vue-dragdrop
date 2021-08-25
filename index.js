
const dataTransfer = { dragged: undefined }

export const drag = {
  emits: [],
  methods: {
    dragging(evt) {
      dataTransfer.dragged = (evt || {}).target
    }
  },

  template: `
  <div draggable="true" @dragstart="dragging">
    <slot></slot>
  </div>
  `
}

export const drop = {
  props: {select: {default: '*'}},
  emits: ['dropped', 'dragover', 'dragenter', 'dragleave'],
  methods: {
    source() {return dataTransfer.dragged},
    selection(del /*dropped element */) {
      const filters = [
        el => el? el.querySelector(this.select): el
      ]

      return filters.reduce((el, f) => f(el), del)
    },
    drop(evt) {
      const selected = this.selection(this.source()) // selected source
      const allowDrop = _ => {
        const same = evt.currentTarget.isSameNode(this.source())

        return !same && selected != null
      }

      allowDrop()? this.$emit('dropped', selected): false
    },
    over(evt) { this.$emit('dragover', evt) },
    enter(evt) { this.$emit('dragenter', evt) },
    leave(evt) { this.$emit('dragleave', evt) },
  },

  template: `
  <div
    @drop.prevent="drop"
    @dragover.prevent="over"
    @dragenter.prevent="enter"
    @dragleave.prevent="leave"
  >
    <slot></slot>
  </div>
  `
}

export const dragdrop = {
  props: drop.props,
  emits: [...drag.emits, ...drop.emits],

  methods: {
    ...drag.methods,
    ...drop.methods
  },

  template: `
  <div draggable="true" @dragstart="dragging" @drop.prevent="drop" @dragover.prevent="over">
    <slot></slot>
  </div>
  `
}