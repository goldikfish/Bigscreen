from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from myapp.models import UPR,SLR
import json
from django.core import serializers
from django.forms.models import model_to_dict
# Create your views here.
'''调用HTML模版'''
def index(request):
    title = "就业情况可视化大屏"
    ulist = UPR.objects.all()
    context = {"uprlist":ulist}
    return render(request, 'index.html', {"name": title},context)

'''失业率可视化管理'''
#浏览信息
def indexupr(request):
    try:
        ulist = UPR.objects.all()
        context = {"uprlist":ulist}
        return render(request,"unemployment/upr.html",context) #加载模板
    except:
        return HttpResponse("没有找到失业率信息！")
#加载添加信息表单
def addupr(request):
    return render(request,"unemployment/addupr.html")
#执行信息添加
def insertupr(request):
    try:
        ob = UPR()
        #从表单获取要添加的信息并封装到ob对象中
        ob.time = request.POST['time']
        ob.uprate_1 = request.POST['uprate_1']
        ob.uprate_2 = request.POST['uprate_2']
        ob.uprate_3 = request.POST['uprate_3']
        ob.save()
        context = {"info":"添加成功！"}
    except:
        context = {"info":"添加失败！"}
    return render(request,"unemployment/info.html",context)
#执行用户信息删除
def delupr(request,uid=0):
    try:
        ob = UPR.objects.get(id=uid)#获取要删除的数据
        ob.delete()
        context = {"info":"删除成功"}
    except:
        context = {"info":"删除失败！"}
    return render(request,"unemployment/info.html",context)

#前后端数据交互
def getData(request):
    slist = SLR.objects.all()
    jobname = []
    y2021 = []
    y2020 = []
    y2019 = []
    y2018 = []
    y2017 = []
    y2016 = []
    for i in slist:
        jobname.append(i.jobname)
        y2021.append(i.y_2021)
        y2020.append(i.y_2020)
        y2019.append(i.y_2019)
        y2018.append(i.y_2018)
        y2017.append(i.y_2017)
        y2016.append(i.y_2016)
    result = {
        "status": True,
        "data": {
            'jobname':jobname,
            'y2021':y2021,
            'y2020':y2020,
            'y2019':y2019,
            'y2018':y2018,
            'y2017':y2017,
            'y2016':y2016,
        }
    }

    #json_data = serializers.serialize('json', slist)
    #return HttpResponse(json_data, content_type="application/json")
    #return JsonResponse({'jobname':jobname},{'y2021':y2021},{'y2020':y2020},{'y2019':y2019},{'y2018':y2018},{'y2017':y2017},{'y2016':y2016})
    return JsonResponse(result)

#前后端交互2
def getData2(request):
    jlist = UPR.objects.all()
    y_month = []
    allpeople = []
    youth = []
    middle = []
    for i in jlist:
        y_month.append(i.time)
        allpeople.append(i.uprate_1)
        youth.append(i.uprate_2)
        middle.append(i.uprate_3)
    result = {
        "status": True,
        "data": {
            'y_month':y_month,
            'allpeople':allpeople,
            'youth':youth,
            'middle':middle,
        }
    }
    return JsonResponse(result)