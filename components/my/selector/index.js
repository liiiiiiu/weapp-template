// components/my/selector/index.js
Component({
  properties: {

  },

  data: {
    selectedHD: 0,
    selectedOther: 0,
    selectedBD: 0,
  },

  methods: {
    handleSelectHD(e) {
      const index = e.currentTarget.dataset.index
      this.setData({ selectedHD: parseInt(index) })
      this.triggerEvent('selectHD', index)
    },

    handleSelectOther(e) {
      const index = e.currentTarget.dataset.index
      this.setData({ selectedOther: parseInt(index) })
      this.triggerEvent('selectOther', index)
    },

    handleSelectBD(e) {
      const index = e.currentTarget.dataset.index
      this.setData({ selectedBD: parseInt(index) })
      this.triggerEvent('selectBD', index)
    },
  }
})
