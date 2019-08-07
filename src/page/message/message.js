import $ from 'jquery'
import headerTool from '../headers/headerTool'
export default {
    name: 'message',
    components:{
    headerTool
    },
    data() {
        return {
            tabList:[
                {title: '我发布的', chosen: true, num: 0, id: 0},
                {title: '回复我的', chosen: false, num: 8, id: 1},
                {title: '收到的赞', chosen: false, num: 1000, id: 2}
            ],
            titleJson:{
                title: '消息',
                toolBol: false,
                toolTitle: '',
                hasRed: false
            },
        }
    },
    mounted () {
    },
    methods:{
        chosen_li(i,e){
            var par = $(e.target).parents('.tab');
            this.tabList.forEach(ele => {
                ele.chosen = (ele.id == i.id ? true : false); 
            })
            switch(i.id){
                case 0:
                    $(par).removeClass('second').removeClass('third');
                    break;
                case 1:
                    $(par).removeClass('third').addClass('second');
                    break;
                case 2:
                    $(par).removeClass('second').addClass('third');
                    break;
            }
        }
    }
  }