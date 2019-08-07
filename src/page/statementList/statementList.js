import headerTool from '../headers/headerTool'
export default {
    name: 'statement',
    components:{
      headerTool
    },
    data() {
      return {
        titleJson:{
            title: '',
            toolBol: false,
            toolTitle: '',
            hasRed: false
        },
        choseItem: '',
        sortList:[
            {title: '最热发言', id: 1, chosen: false},
            {title: '最新发言', id: 2, chosen: false},
            {title: '最近回复', id: 3, chosen: false}
        ],
        clickKind: ''
      }
    },
    mounted () {
        this.titleJson['title'] = this.$route.query.title;
    },
    methods:{
        // 打开举报遮罩（有可能是举报有可能是删除）
        complaint(e,id){
            this.clickKind = 'list-tip';
            this.pop_position(e.target,'.pop .list-tip',true);
            this.choseItem = id;
        },
        // 选中举报
        complaint_item(){
            document.querySelector('.pop').className='pop';
        },
        // 选中排序方式
        chose_sort(i){
            this.sortList.forEach(s => {
                s.chosen = s.id == i.id ? true : false;
            })
            document.querySelector('.pop').className = 'pop';
        },
        // 打开排序遮罩
        show_sort(e){
            this.clickKind = 'list-sort';
            var ele = e.target.className == 'statement-sort'? e.target : e.target.querySelector('.statement-sort');
            this.pop_position(ele,'.pop .list-sort',false);
        },
        // 定位黑色遮罩中的白框的位置
        pop_position(ele,cName,bol){
            document.querySelector('.pop').className='pop show';
            var yBody = window.screen.availHeight;
            var x = ele.getBoundingClientRect().left - 79;
            var y = ele.getBoundingClientRect().top + 24;
            y = (bol && (y + 57)) > yBody ? y - 81 : y; 
            document.querySelector(cName).style.top = y+'px';
            document.querySelector(cName).style.left = x+'px';
        },
        // 跳转至详情页
        statement_details(id){
            this.$router.push({
                path: '/statementDetail', 
                query:{id: id}
            });
            console.log(id)
        },
        show_input(){

        }
    }
  }