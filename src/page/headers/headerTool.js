import {common} from '../../common/js/common'
export default {
    name: 'headerTool',
    props:{
      titleJson: {
        title: '',
        toolBol: false,
        toolTitle: '',
        hasRed: false,
        url: ''
      }
    },
    data () {
      return {
          
      }
    },
    methods: {
      link_to(url){
        console.log(url);
        this.$router.push({path: url});
      },
      back_to(){
        common.back()
      }
    }
  }