# orb-vue-dragdrop
We expose three simple vue components: drag, drop and dragdrop. These components use slots to host the content. The *drop* component emits two events: dropped and dragover.

## Installation
```js
npm install orb-vue-dragdrop
```

### drag
```html
<drag>
  <h5>hello</h5>
</drag>
```

### drop
The below example uses the **select** property on <drop> tag to filter the droppable element. The select property supports the same format as the selectors in [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).
```html
<!-- Draggable element-->
<drag>
  <div class="immovable">
    <h5>I can be dragged.<h5>
  </div>
</drag>

<!-- Draggable element-->
<drag>
  <div class="moveable">
    <h5>I can be dragged.<h5>
  </div>
</drag>

<!-- Catcher: It catched the div.movable elements -->
<drop select="div:first-child.movable" @dropped="handler">
  Drop Area
</drop>
```

#### Events
The drop components support ***four*** events: dropped, dragover, dragenter and dragleave.
* dropped: The dropped event is emitted when the dropped element statisfies the select criteria. The value of the event is the qualified element.
* dragover, dragenter and dragleave: These are emitted, as the name suggest, when an element is dragged over the <drop> element.

### dragdrop
The dragdrop element behaves both as a drag and a drop element.