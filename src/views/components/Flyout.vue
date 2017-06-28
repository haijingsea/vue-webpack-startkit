<template>
  <div>
    <div class="main-toolbar">
      <h1 class="page-title">Flyout</h1>
    </div>
    <div class="main-content">
      <div class="mb-3">
        <h5>Flyout Position</h5>
        <button class="btn btn-primary" @click="show($event)">Bottom Left</button>
        <button class="btn btn-primary" @click="show($event, 'bottom', 'center')">Bottom Center</button>
        <button class="btn btn-primary" @click="show($event, 'bottom', 'right')">Bottom Right</button>

        <button class="btn btn-primary" @click="show($event, 'top', 'left')">Top Left</button>
        <button class="btn btn-primary" @click="show($event, 'top', 'center')">Top Center</button>
        <button class="btn btn-primary" @click="show($event, 'top', 'right')">Top Right</button>
      </div>

      <div class="mb-3">
        <button class="btn btn-primary" @click="show($event, 'right', 'top')">Right Top</button>
        <button class="btn btn-primary" @click="show($event, 'right', 'center')">Right Center</button>
        <button class="btn btn-primary" @click="show($event, 'right', 'bottom')">Right Bottom</button>
      </div>

      <div class="mb-3">
        <i class="fa fa-group pointer" @click="show($event)"></i>
      </div>


      <div class="mb-3">
        <h5>Confirm Flyout</h5>
        <button class="btn btn-danger" @click="confirm">Delete</button>
        <button class="btn btn-danger" @click="confirmText">With Text</button>
      </div>

      <div class="mb-3">
        <h5>Tips</h5>
        <button class="btn btn-success" @click="tips($event, 'success')">Tips Success</button>
        <button class="btn btn-warning" @click="tips($event, 'warning')">Tips Warning</button>
        <button class="btn btn-danger" @click="tips($event, 'danger')">Tips Danger</button>
        <button class="btn btn-info" @click="tips($event, 'info')">Tips Info</button>
        <button class="btn btn-secondary" @click="tips($event, 'tips')">Tips</button>
      </div>
    </div>

    <flyout ref="flyout" class="flyout-box card">
      <div class="card-block">
        <form-container :model="formModel" :grid="true"></form-container>
      </div>
    </flyout>
  </div>
</template>

<script>
  import FormContainer from 'components/Form'
  import { confirm, tips } from 'flyout';

  export default {
    name: 'FlyoutView',
    components: {
      FormContainer
    },
    data(){
      return {
        formModel: FormModel.create({
          fields: [{
            label: 'Name',
            name: 'name',
            type: 'input',
            placeholder: 'Username'
          }]
        })
      }
    },
    methods: {
      show(e, placement = 'bottom', alignment = 'left'){
        this.$refs.flyout.show(e.target, placement, alignment)
      },
      confirm(e){
        confirm(e.target, function () {
          tips(e.target, 'deleted', 'success')
        });
      },
      confirmText(e){
        confirm(e.target, function () {
          tips(e.target, 'deleted', 'success')
        }, 'Are you sure?');
      },
      tips(e, type){
        tips(e.target, type, type)
      }
    }
  }
</script>
