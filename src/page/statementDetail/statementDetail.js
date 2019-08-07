import headerTool from '../headers/headerTool'
  export default {
    name: 'detail',
    components:{
      headerTool
    },
    data() {
      return {
        titleJson:{
            title: '发言详情',
            toolBol: true,
            toolTitle: '· · ·',
            hasRed: false
        },
      }
    },
    mounted () {
    },
    methods:{
    }
  }