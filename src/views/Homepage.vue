<template>
<div>
  <header>
    <form class='head'>
      <img  class='Microphone' src='../images/话筒.png' >
      <input type='text' class='search' v-model="search">
      <img class='sound' src='../images/声音 .png' height='25' width='27' alt=''>
      <div class="search_box">
        <ul>
          <li id="search_result" v-for="item in serachResult">
           {{item.name}}
         </li>
        </ul>
      </div>
     
    </form>
  </header>
  <div class='toped'>
    <ul>
      <li><a href='javascript:;' title=''>个性推荐</a></li>
      <li><a href='javascript:;' title=''>歌单</a></li>
      <li><a href='javascript:;' title=''>主播电台</a></li>
      <li><a href='javascript:;' title=''>排行榜</a></li>
    </ul>
  </div>
  <div id='carousel-example-generic' class='carousel slide' data-ride='carousel'>
  <!-- Indicators -->
  <ol class='carousel-indicators'>
    <li data-target='#carousel-example-generic' data-slide-to='0' class='active'></li>
    <li data-target='#carousel-example-generic' data-slide-to='1'></li>
    <li data-target='#carousel-example-generic' data-slide-to='2'></li>
    <li data-target='#carousel-example-generic' data-slide-to='2'></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class='carousel-inner' role='listbox'>
    <div class='item active'>
      <img src='../images/bglubbo_3.jpg'>
      <div class='carousel-caption'>
      </div>
    </div>
    <div class='item'>
      <img src='../images/bglubbo_2.jpg'>
      <div class='carousel-caption'>
      </div>
    </div>
     <div class='item'>
      <img src='../images/bglubbo_5.jpg'>
      <div class='carousel-caption'>
      </div>
    </div>
    <div class='item'>
      <img src='../images/bglubbo_4.jpg'>
      <div class='carousel-caption'>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <a class='left carousel-control' href='#carousel-example-generic' role='button' data-slide='prev'>
    <span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>
    <span class='sr-only'>Previous</span>
  </a>
  <a class='right carousel-control' href='#carousel-example-generic' role='button' data-slide='next'>
    <span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>
    <span class='sr-only'>Next</span>
  </a>
</div>
  <div class='anniu'>
    <ul>
      <li><a href='javascript:;'><img src='../images/音箱.png'><p>私人FM</p></a></li>
      <li><a href='javascript:;'><img src='../images/日历.png'><p>每日歌曲推荐</p></a></li>
      <li><a href='javascript:;'><img src='../images/排行.png'><p>云音乐热歌榜</p></a></li>
    </ul>
  </div>
   <p class="title_font">歌曲排行榜</p>
  <!-- 推荐歌单 -->
  <div class='RecommendedList'>
   
    <ul class="list">
      <li v-for="rank in musicRank">
        <div class="music_box">
          <div class="img_box">
            <img :src="rank.coverImgUrl" height="100" width="100">
          </div>
            <div class="title">
              <h4>{{rank.title}}</h4>
              <ul>
                <router-link tag="li" v-for="(musicItem,index) in rank.top3" :to="{name: 'player', params:{id: musicItem.id}}">
                  <p>{{index + 1}}.<span>{{musicItem.title}}</span></p>
                </router-link>
              </ul>
            </div>
        </div>
      </li>
    </ul>
  </div>
</div>
<!-- middle --> 
</template>

<script>

export default{
  data () {
    return {
      serachResult: '',
      myDate: '',
      search: '',
      idx: '',
      musicRank: []
    }
  },
  methods: {
    showresouInput (value) {
      this.serachResult = value
    }
  },
  watch: {
    search: function () {
      if (this.search !== '') {
        this.$http.get('search?keywords=' + this.search).then((response) => {
          this.serachResult = response.body.songs.name
        })
      }
    }
  },
  mounted () {
    for (let i = 0; i < 5; i++) {
      ((index) => {
        this.$http.get('top/list', {
          params: {
            idx: index
          }
        }).then(res => {
          this.musicRank.push({
            id: index,
            title: res.body.result.name,
            coverImgUrl: res.body.result.coverImgUrl,
            playCount: res.body.result.playCount,
            top3: [
             {id: res.body.result.tracks[0].id, title: res.body.result.tracks[0].name},
             {id: res.body.result.tracks[1].id, title: res.body.result.tracks[1].name},
             {id: res.body.result.tracks[2].id, title: res.body.result.tracks[2].name}
            ]
          })
        })
      })(i)
    }
  }
}
</script>

<style scoped>
body ul li{
  list-style: none;
}
  .head{
    text-align: center;
    background-color: #CF3D38;
    padding: 10px;
}
  .search{
    width: 280px;
    outline:none;
    padding-left: 5px;
    -moz-border-radius: 11px;
    -khtml-border-radius: 11px;
    -webkit-border-radius: 11px;
    border-radius: 11px;
}
  .search_box{
    width: 200px;
    height: 200px;
    text-align: center;
}
  .head .Microphone{
    float: left;
    height: 25px;
    width: 25px;
}
  .head .sound{
    width: 20px;
    height: 25px;
    float: right;
}
  .toped{
    overflow: hidden;
    width: 100%;
    line-height: 40px;
  }
  .toped ul li{
    color: #000;
    list-style: none;
    text-align: center;
    width: 25%;
    float: left;
    background-color: #fff;
    font-size: 16px;
  }
  .toped ul li a{
    color: #000;
  }
  .anniu{
    overflow: hidden;
    border-bottom: 1px solid #BFBFBF;
    width: 100%;
    padding-top: 20px;
  }
  .anniu ul li{
    padding-bottom: 10px;
    text-align: center;
    float: left;
    width: 33%;
  }
  .anniu ul li a{
    position: relative;
  }
  .anniu ul li a img{
    width: 30px;
    height: 30px;
  }
  .anniu ul li a p{
    margin:5px; 
    font-size: 14px;
    color: #000;
  }
  .RecommendedList{
    background-color: #F4F4F4;
    text-align: center;
    padding: 5px;
  }
  .RecommendedList p{
    font-size: 18px;
  }
  .RecommendedList ul li{
    width: 100%;
    background-color: #fff;
    overflow: hidden;
  }
  .img_box{
    float: left;
    overflow: hidden;
    width: 30%;
  }
  .carousel-inner img{
    height: 100%;
    width: 100%;
  }
  .music_box{
    overflow: hidden;
    width: 100%;
  }
  .music_box img{
    float: left;
  }
  .list{
    overflow: hidden;
    padding: 0px;
  }
  .list li{
    padding: 10px;
    margin-bottom: 10px;
    float: left;
  }
  .title{
    float:left;
    text-align: center;
    width: 70%;
  }
  .title h4{
    font-weight: 500;
  }
  .title ul{
    padding: 0;
    margin-top: -8px;
    overflow: hidden;
   }
  .title ul li{
    margin:0px;
    overflow: hidden;
    padding: 0px;
    float: left;
  }
  .title ul li p{
    font-size: 14px;
    margin: 0px;
  }
  .title_font{
    padding: 5px;
    text-align: center;
    font-size: 21px;
  }
  #search_result{
  width: 220px;
  height: 50px;
  font-size: 14px;
}
</style>