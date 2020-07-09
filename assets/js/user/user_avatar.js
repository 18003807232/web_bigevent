$(function(){
    var layer = layui.layer
    var $image = $('#image')
    const options = {
        aspectRadio: 1,//一比一 可以设置为1 / 1 或者 2 / 2
        preview: '.img-preview'//这里是裁剪后显示在哪个区域
    }

    $image.cropper(options)

    $('#btnChooseImage').on('click', function(){
        $('#file').click()
    })

    $('#file').on('change', function(e){
        var filelist = e.target.files
        if(filelist.length === 0){
            return layer.msg('请选择照片！')
        }

        var file = e.target.files[0]//一次只能选择一个文件，所以是【0】
        var imgURL = URL.createObjectURL(file)//将选中的文件转化为路径
        $image
        .cropper('destroy')
        .attr('src', imgURL)//应用路径
        .cropper(options)
    })

    $('#btnUpload').on('click', function(e){
        
    })
})