<template>
  <div>
    <div class="main-toolbar">
      <h1 class="page-title">Form</h1>
    </div>
    <div class="main-content">
      <div class="row">
        <div class="col-sm-12 mb-3">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Inline Form</h5>
            </div>
            <div class="card-block">
              <form-container
                :model="formModel"
                class="form-inline"
              ></form-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import FormModel from 'model/Form'
  import FormContainer from 'components/Form'
  import { delay } from 'helper.js'

  export default {
    name: 'FormView',
    components: {
      FormContainer
    },
    data(){
      this.timer = null;

      return {
        formModel: FormModel.create({
          fields: [{
            label: 'Name',
            name: 'name',
            type: 'input',
            value: 'languid'
          }, {
            label: 'Type',
            name: 'type',
            type: 'select',
            value: 1,
            items: [{
              label: 'A',
              value: 1
            }, {
              label: 'B',
              value: 2
            }]
          }, {
            type: 'button',
            preset: 'submit'
          }]
        })
      }
    }
  }
</script>
