$(function(){
    //点击“去注册账号”的链接
    $("#link_reg").on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击“去登陆”链接
    $("#link_login").on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从类 UI 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],  
        name:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']  ,
        repwd: function(value){
            //通过形参拿到的是确认密码框的内容
            //还需要拿到密码框中的内容
            //然后进行等于比较
            //如果判断失败则返回一个错误提示消息
            var pwd = $('.reg-box [name=password]').val()
            if(value !== pwd)
            {
                return'两次密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function(e){
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(), 
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data,
            function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！'); 

                $('#link_login').click()
            }
        )
    })

    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'api/login',
            method:'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
        })
    })
})