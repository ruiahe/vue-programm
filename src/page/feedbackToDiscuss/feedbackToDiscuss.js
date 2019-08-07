
import headerTool from '../headers/headerTool'
export default {
  name: 'FeedbackToDiscuss',
  data () {
    return {
      list: [],
      titleJson:{
        title: '反馈讨论',
        url: '/message',
        toolBol: true,
        toolTitle: '消息',
        hasRed: true,
      }
    }
  },
  components:{
    headerTool
  },
  methods:{
    link_to(url, id, title){
      this.$router.push({
        path: url, 
        query:{id: id, title: title}
      });
    }
  },
  mounted() {
    this.list = [
      { id:0, title: '#来点建议', imgSrc: '/static/images/pic_touxiang.png', peoNum: 188, discuss: 389, content: '我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能'},
      { id:1, title: '#Bug反馈', imgSrc: '/static/images/pic_touxiang.png', peoNum: 2898, discuss: 6895, content: '我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能'},
      { id:2, title: '#我要新功能', imgSrc: '/static/images/pic_touxiang.png', peoNum: 95, discuss: 586, content: '我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能'},
      { id:3, title: '#我与探记的故事 投稿', imgSrc: '/static/images/pic_touxiang.png', peoNum: 368, discuss: 76, content: '我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能我觉得探记可以深度优化下记账功能'},
    ]
  }
}