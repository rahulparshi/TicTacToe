var board_hash={}

function checkGame(details,user_socket){
  var checked_flag = 0;
  last_cords = details.split("_");
  //Left Diagonal
  if (last_cords[0] == last_cords[1]) {
    for(var row_ptr=0;row_ptr<3;row_ptr++){
      var str_ptr = ""+row_ptr+"_"+row_ptr;
      var count=0;
      if(board_hash[str_ptr] == user_socket){
        count++;
        if(count==3)
        checked_flag = 1;
      }
    }
  }
  //Right Diagonal
  //Below 2 is the sum formed by indexes which is 3x3 3-1
  if ((parseInt(last_cords[0])+parseInt(last_cords[1]) == 2) && !checked_flag) {
    var count=0;
    for(var row_ptr=0;row_ptr<3;row_ptr++){
      var str_ptr = ""+row_ptr+"_"+(2-row_ptr)
      if(board_hash[str_ptr] == user_socket){
        count++;
        if(count==3)
        checked_flag = 1;
      }
    }
  }
  //ColumnCheck
  if(!checked_flag){
    var count=0;
    for(var row_ptr=0;row_ptr<3;row_ptr++){
      var str_ptr = ""+row_ptr+"_"+last_cords[1]
      if(board_hash[str_ptr] == user_socket){
        count++;
        if(count==3)
        checked_flag = 1;
        }
      }
    }

  //RowCheck
  if(!checked_flag){
    var count=0;
    for(var col_ptr=0;col_ptr<3;col_ptr++){
      var str_ptr = ""+last_cords[0]+"_"+col_ptr
      if(board_hash[str_ptr] == user_socket){
        count++;
        if(count==3)
        checked_flag = 1;
        }
      }
    }
    if(checked_flag == 1)
    {
      alert('game over!'+ user_socket+"won the match");
    }
  }
