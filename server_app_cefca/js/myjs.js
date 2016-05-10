var puntos=[];
var selected='selectsupernova';
function isnotselected(theid){
	if(theid.attr('id')==selected){
		return 0;
	} else {
		return 1;
	}
}
function lightonly(theid){
	$(".selector").css('filter','grayscale(90%)');
	$(".selector").css('-webkit-filter','grayscale(90%)');
	theid.css('filter','grayscale(0%)');
	theid.css('-webkit-filter','grayscale(0%)');
}
function getSvg(){
	if(selected == 'selectsupernova'){
		return '/static/app_cefca/img/supernova.svg';
	} else if (selected == 'selecterror'){
		return '/static/app_cefca/img/cancel.svg';
	} else {
		return '/static/app_cefca/img/help-bubble.svg';
	}
}
function adderasecircle(thecircle){
	$(thecircle).click(function(e){
		console.log('circulo');
		var theid=$(this).attr('id').split("_")[1];
		var eliminar;
		console.log("---"+theid);
		$("#rcir_"+theid).remove();
		$("#ccir_"+theid).remove();

		$("#lcir_"+theid).remove();
		jQuery.each(puntos, function(i, val) {
			console.log("----"+val);
			if(val.id == theid) // delete index
				{
					eliminar=i;
				}
		});

		puntos.splice(eliminar,1);
		console.log(JSON.stringify(puntos));
		e.stopPropagation();
	});
}
function addsvgfunctionalities(){
	$("svg").click(function(e){
		//Get left, top of the click
		mleft=e.pageX-$(this).offset().left;
		mtop=e.pageY-$(this).offset().top;

		console.log('clickondiv '+(e.pageX-mleft)+ " "+(e.pageY-mtop));		

		//Sacamos la longitud del json
		var npuntos=puntos.length;
		console.log(JSON.stringify(puntos));
	

		//Añadimos a los tres svgs
		icon = getSvg();
		var img1 = document.createElementNS('http://www.w3.org/2000/svg','image');
		img1.setAttributeNS(null,'height','50');
		img1.setAttributeNS(null,'width','50');
		img1.setAttributeNS(null,'class','circulo');
		img1.setAttributeNS('http://www.w3.org/1999/xlink','href',icon);
		img1.setAttributeNS(null,'x',mleft-25);
		if(selected == 'selectquestion'){
			img1.setAttributeNS(null,'y',mtop-50);
		} else {
			img1.setAttributeNS(null,'y',mtop-25);
		}
		img1.setAttributeNS(null,'id','lcir_'+npuntos);
		$('#svg1').append(img1);

		var img2 = document.createElementNS('http://www.w3.org/2000/svg','image');
		img2.setAttributeNS(null,'height','50');
		img2.setAttributeNS(null,'width','50');
		img2.setAttributeNS(null,'class','circulo');
		img2.setAttributeNS('http://www.w3.org/1999/xlink','href',icon);
		img2.setAttributeNS(null,'x',mleft-25);
		if(selected == 'selectquestion'){
			img2.setAttributeNS(null,'y',mtop-50);
		} else {
			img2.setAttributeNS(null,'y',mtop-25);
		}
	
		img2.setAttributeNS(null,'id','ccir_'+npuntos);
		$('#svg2').append(img2);


		var img3 = document.createElementNS('http://www.w3.org/2000/svg','image');
		img3.setAttributeNS(null,'height','50');
		img3.setAttributeNS(null,'width','50');
		img3.setAttributeNS(null,'class','circulo');
		img3.setAttributeNS('http://www.w3.org/1999/xlink','href',icon);
		img3.setAttributeNS(null,'x',mleft-25);
		if(selected == 'selectquestion'){
			img3.setAttributeNS(null,'y',mtop-50);
		} else {
			img3.setAttributeNS(null,'y',mtop-25);
		}
	
		img3.setAttributeNS(null,'id','rcir_'+npuntos);
		$('#svg3').append(img3);

		adderasecircle('#lcir_'+npuntos);
		adderasecircle('#ccir_'+npuntos);
		adderasecircle('#rcir_'+npuntos);



		//Recargamos svgs TODO: Esto puede dar problemas
		puntos.push({"id": npuntos, "type": selected, "posx": " "+mleft, "posy": " "+mtop});
		console.log(puntos);
	})
	$(".selector").mouseover(function(){
		$(this).css('filter','grayscale(0%)');
		$(this).css('-webkit-filter','grayscale(0%)');
	});
	$(".selector").mouseout(function(){
		if(isnotselected($(this))) {
			console.log('out');
			$(this).css('filter','grayscale(90%)');
			$(this).css('-webkit-filter','grayscale(90%)');
		}
	});
	$(".selector").click(function(){
		if($(this).attr('id') == 'selectsupernova'){
			selected = 'selectsupernova';
		} else if ($(this).attr('id') == 'selecterror'){
			selected = 'selecterror';
		} else {
			selected = 'selectquestion';
		}
		lightonly($(this));
	});
	$(document).tooltip({
		items: " img, [help], [title]",
      content: function() {
        var element = $( this );
        if ( element.is( "[help]" ) ) {
          var text = element.text();
          return "<div class='mytip'>Supernova</div> <img class='myimgtip' src='/static/app_cefca/img/supernova.jpg'/><hr class='mytip'/><br /><div class='mytip'>Rayo&nbsp;&nbsp;&nbsp;</div><img class='myimgtip' src='images/rayo.jpg'/>";
        }
        if ( element.is( "[title]" ) ) {
          return element.attr( "title" );
        }
	if ( element.is( "img" ) ) {
          return element.attr( "alt" );
        }
	},
		    position: {
        my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
	   }
      }
    });

}
onload = function(){
	addsvgfunctionalities();
	lightonly($('#selectsupernova'));
};
