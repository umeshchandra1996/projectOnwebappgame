$(function () {

	var anim_id;
	var gameboard =$('#gameboard');
	var car =$('#car');
	var car_1 =$('#car_1');
	var car_2 =$('#car_2');
	var car_3 =$('#car_3');
	

	var line_1 =$('#line_1');
	var line_2 =$('#line_2');
	var line_3 =$('#line_3');


	//var restart_board =$('#restart_board');
	var restart_btn =$('#restart');

	var stop=$('#stop');
	var score = $('#score');

	var gameboard_left =parseInt(gameboard.css('left'));

	var gameboard_width =parseInt(gameboard.width());
	var gameboard_height =parseInt(gameboard.height());
	
    var car_height=parseInt(car.height());
	var car_width=parseInt(car.width());

	var gameover=false;
	var score_counter = 1;

    var speed = 2;   	
	var line_speed=5;

	var move_left=false;
	var move_right=false;
	var move_up=false;
	var move_down=false;

	//move key 


$(document).on('keydown', function(kd)
{
        if (gameover === false)
        {
            var key = kd.keyCode;
            if (key === 37 && move_left === false) 
            {
                move_left = requestAnimationFrame(left);
            } 
            else if (key === 39 && move_right === false)
            {
                move_right = requestAnimationFrame(right);
            }
            else if (key === 38 && move_up === false)
            {
                move_up = requestAnimationFrame(up);
            } 
            else if (key === 40 && move_down === false)
            {
                move_down = requestAnimationFrame(down);
            }
        }
 });


$(document).on('keyup', function(ku)
     {
        if (gameover === false) 
        {
            var key = ku.keyCode;
            if (key === 37)
             {
                cancelAnimationFrame(move_left);
                move_left = false;
            }
             else if (key === 39)
            {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) 
            {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) 
            {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

function left() 
    {
        if (gameover === false && parseInt(car.css('left')) > 0) //when game not over and car not on left 0 position
        {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }




function right() 
    {
         if (gameover === false && parseInt(car.css('left')) < gameboard_width - car_width)// when game not over  
         {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

function up() 
    {
        if (gameover === false && parseInt(car.css('top')) > 0) 
        {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

function down() 
    {
        if (gameover === false && parseInt(car.css('top')) < gameboard_height - car_height) 
        {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }




 anim_id = requestAnimationFrame(repeat);

function repeat() {
        if (collision(car, car_1) || collision(car, car_2)  || collision(car, car_3)) 
        {
            audio.pause();

            audio_c();
            stop_the_game();
            return ;
        }
        score_counter++;

        if (score_counter % 25 == 0) {
        	score.text(parseInt(score.text()) + 1);
        }
        if (score_counter % 250 == 0) {
            speed=speed+1;
            line_speed=speed+1;
        }
   

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);


        line_down(line_1);
        line_down(line_2);
        line_down(line_3);


        anim_id = requestAnimationFrame(repeat);
    }


    function car_down(car) 
    {
        var car_current_top = parseInt(car.css('top'));

        if (car_current_top > gameboard_height) 
        {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (gameboard_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

    function line_down(line) 
    {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > gameboard_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

   restart_btn.click(function() 
   {
        location.reload();
    });



//stop the game

function stop_the_game() {
        
        //audio.pause();

        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);

         setTimeout(function(){alert("GAME OVER!!! CLICK START BUTTON !!!PLAY AGAIN!! "); }, 3000);
        //alert("GAME OVER!!! CLICK START BUTTON !!!PLAY AGAIN!! ");
        
        
        gameover = true;
        restart_btn.focus();
    }

 


 

    





//car collision safe of car


function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
        	       return false;

        return true;
    }






});

var audio_crash;
    function audio_c(){
        audio_crash = new Audio();
        audio_crash.src ="Carcrash.mp3";
        audio_crash.play();


    }


//music play on /off 
	var audio,mutebtn;

    
	function initAudioPlayer() {


		audio = new Audio();
		audio.src ="race.mp3";
		audio.loop=true;
		audio.play();

		
		mutebtn=document.getElementById("mutebtn");
		
		mutebtn.addEventListener("click",mute);

		
	function mute() {

			if (audio.muted) {
				audio.muted=false;
				mutebtn.style.background="url(sound.png) no-repeat";

			}
			else{
				audio.muted=true;
				mutebtn.style.background="url(soundmute.png) no-repeat";
			}
			// body...
		}






		// body...
	}
	window.addEventListener("load",initAudioPlayer);




    
















//help info show

function help() {
    var x = document.getElementById("info");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
//difficulty show in low page
function diffi() {
    var d = document.getElementById("diff");
    if (d.style.display === "none") {
        d.style.display = "block";
    } else {
        d.style.display = "none";
    }
}



