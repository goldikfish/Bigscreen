from django.db import models

# Create your models here.
class UPR(models.Model):
    '''自定义Stu表对应的Model类'''
    #定义属性：默认主键自增id字段可不写
    id = models.AutoField(primary_key=True)
    time = models.CharField(max_length=45)
    uprate_1 = models.CharField(max_length=45)
    uprate_2 = models.CharField(max_length=45)
    uprate_3 = models.CharField(max_length=45)

    # 定义默认输出格式
    def __str__(self):
        return "%d:%s:%s:%s:%s"%(self.id,self.time,self.uprate_1,self.uprate_2,self.uprate_3)

    # 自定义对应的表名，默认表名：myapp_upr
    class Meta:
        db_table="unemployment"

#各行业平均薪资
class SLR(models.Model):
    '''自定义Stu表对应的Model类'''
    #定义属性：默认主键自增id字段可不写
    id = models.AutoField(primary_key=True)
    jobname = models.CharField(max_length=45)
    y_2021 = models.IntegerField()
    y_2020 = models.IntegerField()
    y_2019 = models.IntegerField()
    y_2018 = models.IntegerField()
    y_2017 = models.IntegerField()
    y_2016 = models.IntegerField()

    # 定义默认输出格式
    def __str__(self):
        return "%s"%(self.jobname)

    # 自定义对应的表名，默认表名：myapp_upr
    class Meta:
        db_table="salary_year"