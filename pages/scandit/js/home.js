$(document).ready(function(){
	
	var cart_total=0;
	var t=0;
	$('#login_b').click(function(a){
	a.preventDefault();
	var username=$('#username').val();
	var password=$('#password').val();
	$.ajax({
		type: "post",
		data: {username:username,password:password},
		url: "inc/login.php",
		success: function(rsp){ 
			$('.loginmsg').html('');
			$('.loginmsg').append(rsp);
			var member_success=document.getElementById('member');
			var name=$("#member").text();
			//var admin_success=document.getElementById('admin');
			if(member_success!=null){
				window.location="#main";
				$("#scan_modeal").remove();
			}
		}
	});

	$('#logout').click(function(){
		$("#member").html('')
		$.ajax({
			type:'post',
			url:'inc/logout.php',
			success: function(rsp){
				console.log('logout');
				$('.loginmsg').html('');
				$('#member').html('')
				$("#logout_div").html('');
				document.location.href="home.php";
			}
		});
	});
		
	});

	$('#registration').click(function(a){
		var email=$('#email').val();
		var r_username=$('#rusername').val();
		var password=$('#rpassword').val();
		var password2=$('#password2').val();
		a.preventDefault();
		$.ajax({
			type:'post',
			url:'./inc/registration.php',
			dataType:'html',
			data:{email:email,r_username:r_username,password:password,password2:password2},
			success: function(rsp){
	
				$('#registerpage').html('');
				$('#registerpage').append(rsp);					
			}
		});	
	});
	
	$("#store").click(function(){
		$("#cart").html('');
		$(".cart_msg").html('');
		$(".scan_modal").html('');
		$("#store_div").show();
	})
	
	.ajaxStart(function(){
		$("#ajax_load").show()
	})
	.ajaxStop(function(){
		$("#ajax_load").hide()
	})
	
	$(".store").click(function(){
		var store=$(this).attr('id')
		$("#store_div").hide();
		$(".cart_msg").append('<h2>Load Which List?</h2><button class="list_button" type="button" id="list_1" value="List 1"/>').trigger("create");
		$(".list_button").click(function(){
		var id=$(this).attr('id');
		var list=toString(id);
		$.ajax({
			type:'post',
			url:'inc/load_cart.php',
			data:{id:id,store:store},
			success: function(rsp){
				console.log(rsp);
				$('#cart').html('').append('<table class="'+id+'"><tr id="table_header"><td class="close_col"><p></p></td><td class="product_img"></td><td class="name_col">Description</td><td class="quantity">Quantity</td><td class="unit_price">Unit Price</td><td class="price_col">Total Price</td></tr></table>').trigger("create");
				var contents=$(rsp).find('cart_contents').text()
					$(rsp).find('product').each(function(){
						var sku=$(this).find('sku').text();
						console.log(sku);
						if(contents!=''){
							$(".cart_msg").html('');
							var name=$(this).find('name').text();
							var price=$(this).find('price').text();
							var img=$(this).find('description').text();
							$('#cart table').append('<tr id="'+sku+'"><td class="close_col"><img class="close" src="./images/close.png" alt="close" /></td><td class="product_img"><img src="'+img+'" alt="product_img" /></td><td class="name_col"><p class="'+sku+'_d">'+name+'</p></td><td class="quantity">1</td><td class="unit_price">'+price+'</td><td class="price_col"><p class="cart_price '+sku+'">'+price+'</td></tr>').trigger("create");
							$("table td").fitText(1.2, { minFontSize: '12px', maxFontSize: '20px' });
							$(".quantity").fitText(.6, { minFontSize: '12px', maxFontSize: '20px' });
							$(".unit_price").fitText(.6, { minFontSize: '12px', maxFontSize: '20px' });
							$(".price_col").fitText(.6, { minFontSize: '12px', maxFontSize: '20px' });
					
						}else{
							$('.cart_msg').html('').append('<p>Cart is Empty...</p>').trigger("create");
						}
					})
					
					change_total(cart_total);		
					change_price(store);
					change_description();
					change_quantity();
					//triggers when 'scan item' button is clicked
						$(".scan_modal").html('').append('<input type="number" id="upc" placeholder="Enter UPC/SKU Code"/><a id="scan_send" data-role="button">Find It</a><div id="scan_content"></div>').trigger("create");
						$(".ui-btn-text").fitText(1.0, { minFontSize: '13px', maxFontSize: '30px' });
						$('#scan_send').click(function(){
							$("#scan_content").html('')
							var upc=$('#upc').val();
							$.ajax({
								type:'post',
								url:'inc/upcfind.php',
								dataType:'html',
								data:{upc:upc},
								success: function(info){
									console.log(info)
									$('#scan_content').html('')
									var resp=JSON.parse(info);
									console.log(resp);
									var upcobject=resp[0];
									console.log(upcobject)
									if(upcobject==undefined){
										$('#scan_content').append('<a data-role="button" data-icon="delete" id="scan_close">Close</a><h1>Item Not Found</h1>').trigger("create");
										$("#scan_close").click(function(){
											$("#scan_content").html('');
										})
									}
									else{
										var scan_item=upcobject['productname'];
										var scan_img=upcobject['imageurl'];
										var scan_price=upcobject['price'];	
										$.post('inc/insert_product.php', {upc:upc,scan_item:scan_item,scan_img:scan_img,scan_price:scan_price,store:store}, function(data){
											console.log(data)
											if(data=="in array"){
												$(".cart_msg").html('<p>Item Already in List</p>');
											}
											else{
												$('#cart table').append('<tr id="'+upc+'"><td class="close_col"><img class="close" src="./images/close.png" alt="close" /></td><td class="product_img"><img src="'+scan_img+'" alt="product_img" /></td><td class="name_col"><p>'+scan_item+'</p></td><td class="quantity"><p>1</p></td><td class="unit_price">'+scan_price+'</td><td class="price_col"><p class="cart_price '+upc+'">'+scan_price+'</td></tr>').trigger("create")
												$(".cart_msg").html('');
											}
											delete_item_click()
											change_total(cart_total);
											change_total(cart_total);
											change_price(store);
											change_description();
											change_quantity();
											delete_item_click()
											$("table td").fitText(1.2, { minFontSize: '10px', maxFontSize: '20px' });
											$(".quantity").fitText(.6, { minFontSize: '10px', maxFontSize: '20px' });
											$(".unit_price").fitText(.6, { minFontSize: '10px', maxFontSize: '20px' });
											$(".price_col").fitText(.6, { minFontSize: '10px', maxFontSize: '20px' });
										})
																		
									}
								}
							
						})
					})
					
					//Remove item from cart. 
					delete_item_click();
			}
		});
		})
	})
	
	$("#coupon").click(function(){
		var cart_total=$("#cart_total").text()*.94;
		console.log(cart_total)
		if(cart_total<0){
			$(".cart_msg").html('<p>Add Items to Cart<p>')
		}
		else{
			$(".coupon_modal").remove();
			$(".scan_modal").append('<div class="coupon_modal" style="display:block;margin:0 auto"><img id="coupon_close" src="images/close.png" alt="" /><p>Enter Coupon Deduction:</p><input id="coupon_price" type="text" style="display:block;width:50%;margin:0 auto"/><input type="submit" data-role="button" id="coupon_submit" value="Submit" /></div>').trigger("create")	
			coupon_close()
			$("#coupon_submit").click(function(){
				var coupon_price=$("#coupon_price").val()
				if(coupon_price>cart_total){
					$(".coupon_modal").remove()
					$(".cart_msg").html('').append('<p>Reduction Greater Than Cart Total (minus tax)</p>')
				}
				else{
					$(".cart_msg").html('')
					$(".coupon_modal").remove();
					cart_total=cart_total-coupon_price;
					cart_total=cart_total.toFixed(2)*1.06
					$("#cart_total").text(cart_total.toFixed(2))
				}
			})
		}
	})
	
	function change_total(cart_total){
		$(".cart_price").each(function(){
			var item_price=$(this).text();
			cart_total=parseFloat(cart_total)+parseFloat(item_price);
			parseFloat(cart_total)
			cart_total=cart_total.toFixed(2)
			var new_total=cart_total*1.06;
			$("#cart_total").text("Total: "+new_total.toFixed(2)+" ")
			$("#pre_tax").text("(Pre-Tax: "+cart_total+")");
		})
	}

	//delete item from cart
	function delete_item_click(){
		$(".close").click(function(){
			var sku=$(this).closest('tr').attr('id');
			//list.splice(index, 1);
			$.post('inc/delete_user_product.php', {sku:sku}, function(data){
				console.log(data)
			})
			$(this).closest('tr').remove();
			change_total(cart_total);
		})
	}
	
	function change_price(store){
		$(".unit_price").click(function(){
			var price=$(this).text();
			var id=$(this).closest('tr').attr('id');
			var id_2="."+id;
			var quantity=$(this).parent().find('.quantity').text();
			var price_col=this;
			console.log(price_col)
			$(".price_modal").html('');
			$(".scan_modal").append('<div class="price_modal" style="display:block;margin:0 auto"><img id="price_close" src="images/close.png" alt="" /><p>Enter Correct Price Per Unit:</p><input style="width:50%;display:block;margin:0 auto" id="new_price" type="number" placeholder="'+price+'"/><input type="submit" data-role="button" id="price_submit" value="Submit" /></div>').trigger("create");
			price_close();
			$("#price_submit").click(function(){
				var new_price=$('#new_price').val()
				$.post('inc/update_price.php', {new_price:new_price,id:id,store:store}, function(data){
					console.log(data);
					$(".price_modal").remove();
					var bulk_price=new_price*quantity;
					var bulk_price_2=bulk_price.toFixed(2);
					$(price_col).text(new_price)
					$(id_2).text(bulk_price_2)
					change_total(cart_total);
				})
			})
		})
	}
	
	function change_description(){
		$(".name_col").click(function(){
			var description=$(this).text();
			var id=$(this).closest('tr').attr('id');
			$(".description_modal").html('');
			$(".scan_modal").append('<div class="description_modal" style="display:block;margin:0 auto"><img id="description_close" src="images/close.png" alt="" /><p>Enter Correct Description:</p><input style="width:100%" id="new_description" type="text" value="'+description+'"/><input type="submit" data-role="button" id="description_submit" value="Submit" /></div>').trigger("create");
			description_close()
			$("#description_submit").click(function(){
				var description=$('#new_description').val()
				if(description!=''){
				var description=description.replace("'","");
				$.post('inc/update_description.php', {description:description,id:id}, function(data){
					console.log(data);
					$(".description_modal").remove();
					$("."+id+"_d").text(description)
				})
				}else{
					$(".description_modal").remove();	
				}
			})
		})
	}
	
	function change_quantity(){
		$(".quantity").click(function(){
			var id=$(this).closest('tr').attr('id');
			var quantity_id=this
			var id="."+id;
			var price=$(id).text();
			$(".quantity_modal").html('');
			$(".scan_modal").append('<div class="quantity_modal" style="display:block;margin:0 auto"><img id="quantity_close" src="images/close.png" alt="" /><p>Enter Quantity:</p><input style="width:50%;display:block;margin:0 auto" id="new_quantity" type="number" /><input type="submit" data-role="button" id="quantity_submit" value="Submit" /></div>').trigger("create");
			quantity_close()
			$("#quantity_submit").click(function(){
				var quantity=$('#new_quantity').val()
				var new_price=quantity*price;
				var new_price=new_price.toFixed(2);
				$(id).text(new_price)
				$(quantity_id).text(quantity)
				$(".quantity_modal").remove()
				change_total(cart_total);
			})
		})
	}
	
	function price_close(){
		$("#price_close").click(function(){
			$(".price_modal").html('');
		})
	}
	
	function quantity_close(){
		$("#quantity_close").click(function(){
			$(".quantity_modal").html('');
		})
	}
	
	function description_close(){
		$("#description_close").click(function(){
			$(".description_modal").html('');
		})
	}
	function coupon_close(){
		$("#coupon_close").click(function(){
			$(".coupon_modal").html('')
		})
	}

})