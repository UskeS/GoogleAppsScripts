function tweetBlogPost(){
  var tweetContents = getTweetContents("type A");
  if (tweetContents) {
    DoTweet(tweetContents);
  }
}

function getTweetContents(typeName) {
  var mySS = SpreadsheetApp.openById("Your SpreadSheet ID").getSheets()[0];
  var myDR = mySS.getDataRange();
  var myVL = myDR.getValues();
  //A列の内容をキーとしたオブジェクトを用意し、値に空の配列をセットしておく
  var tweets = {
    "type A": [],
    "type B": [], 
    "type C": []
  };
  //スプレッドシートの内容を読み込んで、tweets変数に用意したキーに配列としてpushしていく
  myVL.forEach(function (cv, i){
    //1列目は無視したいときは、インデックスが0のとき除外
    if (i === 0) {
      return;
    }
    //getValuesメソッドはスプレッドシートの行単位の[[A列],[B列]…]という二重配列になる
    //したがってcv[0]はA列の内容、cv[1]がB列の内容になる
    tweets[cv[0]].push("【"+cv[0]+"】"+cv[1]);
  });
  //乱数取得
  var randNum = Math.floor(Math.random() * Math.floor(tweets[typeName].length));
  return tweets[typeName][randNum]; //読み込んだ内容から乱数で選ばれたものだけを返す
}

function DoTweet(contents) {
  const auth_info = {
    "c_key":"Your Consumer Key",
    "c_sec":"Your Consumer Secret",
    "a_tok":"Your Access Token",
    "a_sec":"Your Access Token Secret",
  }
  Twitter.tweet(auth_info, contents);
}
