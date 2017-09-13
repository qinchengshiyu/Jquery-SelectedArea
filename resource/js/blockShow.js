/**
 * @Description: this javascript file is to generate choosed block and it's can remove and add or get all
 *
 * @github https://github.com/QCSYSTUDIO/Jquery-BlockShow
 * @author qcsy(www.qinchengshiyu@foxmail.com)
 * @version 1.0
 * @timestamp 2017/9/12.
 */
(function ($) {
    var console = window.console || { log: function () {} };
    var callback;
    var key='id';
    var value='name';
    var methods = {
        init: function (options) {
            callback=options.callback;
            key=null==options.valueFiled?'id':options.valueFiled;
            value=null==options.nameFiled?'id':options.nameFiled;
            var rows=options.rows;
            var parentObject=$(this);
            parentObject.children().remove();
            for(var i=0;i<rows.length;i++){
              addBlock(this,rows[i]);
            }
        },
        add: function (options) {
         addBlock(this,options)
        },
        getAllBlockCode:function () {
            var result=[];
            var allLi=$(this).children();
            for(var i=0;i<allLi.length;i++){
                result.push($(allLi[i]).attr("value"));
            }
            return result;
        }
    };
    function addBlock(obj,option) {
        var id="blacks_"+$(obj).attr("id")+"_"+option[key];
        var forColor="";
        var backgroundColor="";
        var borderColor="";
        var front="";
        var behind="";
        if(null!=option.foreColor){
            forColor="color:"+option.foreColor+";"
        }
        if(null!=option.backgroundColor){
            backgroundColor="background-color:"+option.backgroundColor+";"
        }
        if(null!=option.borderColor){
            borderColor="border-color:"+option.borderColor+";";
        }
        if(null==option.closeBtnAlign||option.closeBtnAlign!='left'){
            front= '';
            behind='<a class="controll '+$(obj).attr("id")+'_colsebtn" >×</a>';
        }else{
            front= '<a class="controll '+$(obj).attr("id")+'_colsebtn" >×</a>';
            behind='';
        }
        var title=null==option.title?option[value]:option.title;
        var html=$('<li  id="'+id+'" class="miniBlock" value="'+option[key]+'" title="'+title+'" style="'+forColor+backgroundColor+borderColor+'">'+front+option[value]+behind+'</li>');
        $(obj).append(html);
        $("."+$(obj).attr("id")+"_colsebtn").unbind("click")
        $("."+$(obj).attr("id")+"_colsebtn").on("click",function () {
            try{
                callback($(this).parent().attr("id"));
            }catch (e){
                console.info('without callback!')
            }
            $(this).parent().remove();
        });
    }
    $.fn.blocks = function (method) {
     // load mehods
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.blocks');
        }
    };
})(jQuery);
