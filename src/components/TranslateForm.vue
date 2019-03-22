<!-- <template>
  <div class="row" id="Translate-form">
    <div clas="col-md col-md-offset-3">
      <form id="transForm" class="form-inline well" v-on:submit="formSubmit">
        <input class="form-control" type="text" v-model="textToTranslate" placeholder="Enter a message">
        <select class="form-control" v-model="language">
          <option value="ru">Russian</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="zh">Chineese</option>
          <option value="ko">Korean</option>
        </select>
        <input class="btn btn-primary" type="submit" value="Translate">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslateForm',

  data() {
    return {
      textToTranslate: "",
      language: ""
    }
  },

  created() {
    this.lanuage = 'ko';
  },

  methods: {
    formSubmit(e){
      this.$emit('formSubmit', this.textToTranslate, this.language);
      e.preventDefault(); 
    }
  }
}
</script>

<style>
#transForm{
  border-radius: 10px;
  border: 1px #ccc solid;
}
</style>
 -->