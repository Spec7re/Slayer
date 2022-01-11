new Vue ({
    el: '#app',
    data: {
      gameOn: false,
      playerHealth: 100,
      monsterHealth: 100,
      turns: []
    },
    methods: {
      gameStart: function () {
        this.gameOn = true;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
      },
      attack: function() {
        console.log("ATTACKED");
        var plDamage = this.calculateDamage(3,10);
        var msDamage = this.calculateDamage(3,10);
        this.monsterHealth -= plDamage;
        this.turns.unshift({
            isPlayer: true,
            text:'Player deals Damage: ' + plDamage,
        });
        this.playerHealth   -= msDamage;
        this.turns.unshift({
            isPlayer: false,
            text:'Monster deals Damage: ' + msDamage,
        });
          if (this.winCheck()) {
              return;
          }
        // this.winCheck();
      },
      specialAttack:function() {
        console.log("SPECIAL");
        var specialMonsterDamage = this.calculateDamage(5,15);
        var specialPlayerDamage = this.calculateDamage(5,15);
        this.monsterHealth  -= specialPlayerDamage;
        this.turns.unshift({
            isPlayer: true,
            text:'Player deals Special: ' + specialPlayerDamage,
        });
        this.playerHealth   -= specialMonsterDamage;
        this.turns.unshift({
            isPlayer: false,
            text:'Monster deals Special: ' + specialMonsterDamage,
        });
        // this.monsterAttacks();
          if(this.winCheck()){
            return;
          }
      },
      heal: function(){
        console.log('HEALED');

        if(this.playerHealth <=90){
            var monsterHeal = Math.floor(Math.random() *10);
            var playerHeal = Math.floor(Math.random() *10);
            this.playerHealth  += playerHeal;
            this.turns.unshift({
                isPlayer: true,
                text:'Player HEALED with: ' + playerHeal,
            });
            this.monsterHealth += monsterHeal;
            this.turns.unshift({
                isPlayer: false,
                text:'Monster HEALED with: ' + monsterHeal,
            });
        }
      },
      giveUp: function () {
        this.turns.unshift({
          isPlayer: true,
          text:'Mud on your face! You big disgrace! ',
        });
        this.gameOn = false;
      },
      // monsterAttacks: function(){
      //   this.playerHealth -= this.calculateDamage(3,10)
      // },
      calculateDamage: function(min, max){
          return Math.max(Math.floor(Math.random() *max)+1,min);
      },
      winCheck: function(){
          if(this.monsterHealth <= 0) {
              if(confirm('Hero Won! New Game?')){
                  this.gameStart();
              }else {
                  this.gameOn = false;
              }
          } else if(this.playerHealth <= 0) {
              if(confirm('Monster Won! New Game?')){
                  this.gameStart();
              }else {
                  this.gameOn = false;
              }
            }
          return false;
          }
      }
});
