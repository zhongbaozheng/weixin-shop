$(function () {
    var page = 1;
    $('.weui_panel').dropload({
        scrollArea: window,
        autoLoad: true,
        domUp: {
            domClass: 'dropload-up',
            domRefresh: '<div class="dropload-refresh"><i class="icon icon-12 xz180"></i>上拉加载更多</div>',
            domUpdate: '<div class="dropload-load f15"><i class="icon icon-12"></i>释放更新...</div>',
            domLoad: '<div class="dropload-load f15"><span class="weui-loading"></span>正在加载中...</div>'
        },
        loadDownFn: function (me) {
            ajaxHttpRequest('order/v1/orders', {
                jsonpCallback: 'callback',
                data :{
                    pageNum: page,
                    pageSize: 10
                },
                success: function (data, status) {
                    console.log(data.data);
                    page++;
                    var main = template('main-temp', data);
                    $('.main-wrap').append(main);
                    me.resetload();
                    if (!data.data.hasNextPage) {
                        me.lock();
                        me.noData();
                    }
                },
                error: function (errorType, error) {
                    alert('Ajax error!');
                    me.resetload();
                }
            });
        }
    });
});