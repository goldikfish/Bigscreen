from django.urls import path
from . import views

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('',views.index),
    #配置upr信息操作路由
    path('upr',views.indexupr,name='indexupr'),
    path('upr/add',views.addupr,name='addupr'),
    path('upr/insert',views.insertupr,name='insertupr'),
    path('upr/del/<int:uid>',views.delupr,name='delupr'),
    #数据统计路由
    path('chart/bar/',views.getData,name="chart_bar"),
    path('chart/line/',views.getData2,name="chart_line"),

]