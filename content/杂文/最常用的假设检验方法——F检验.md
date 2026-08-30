---
title: "最常用的假设检验方法——F检验"
aliases: ["最常用的假设检验方法——F检验"]
---

# 最常用的假设检验方法——F检验

最常用的假设检验方法——F检验

2026年6月30日

12:47

最常用的假设检验方法——F检验

比较两个群体之间是否有差异可以用T检验，但是当研究涉及到三个及三个以上的群体差异性比较时该如何分析呢？这就需要用到我们今天介绍的主角——单因素方差分析，也称F检验。

01

什么是单因素方差分析？

单因素方差分析，是最常用的假设检验方法，是用来研究一个控制变量的不同水平是否对观测变量产生了显著影响，主要用于检验三个或三个以上的样本均值是否存在显著差异。

02

什么情况下使用单因素方差分析？

研究中需要检验某一因素的三个或三个以上水平是否对某个定量数据产生影响时，可以使用单因素方差分析。但是进行单因素方差分析需要满足以下条件：

独立性：研究对象是来自于所研究因素的各个水平之下的独立随机抽样

正态性：每个水平下的因变量服从正态分布

方差齐性：各水平下的总体具有相同的方差

03

如何进行单因素方差分析？

我们以A、B、C三个公司所生产灯泡的使用寿命为例，研究人员在各公司生产的灯泡中随机地抽取10个，测量其使用寿命（单位：小时），所得数据如下表所示：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/cbf2c8f400a530d40d55.gif)

试问：三个公司生产的灯泡在使用寿命之间是否存在显著差异？

步骤一：建立H0假设

不同公司生产的灯泡在使用寿命上不存在显著差异。

步骤二：SPSS假设检验

将数据导入到SPSS后，点击【分析】→【比较均值】→【单因素检验】调出单因素方差分析对话框，如下图：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/58590f4836deb066d11f.gif)

然后将灯泡寿命选入【因变量列表】内，将公司选入【因子】内，如下图：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/2f632e305550e8eee474.gif)

点击右侧【选项】，将统计下的描述、方差齐性检验、韦尔奇勾选，并勾选平均值图，如下图：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/4d85ec3d0e79edd287b1.gif)

其中【描述】用于指定输出描述性统计量，【方差同质性检验】用于指定进行方差齐性检验，【韦尔奇】用于指定输出用 Welch 法比较各组均数的统计量，适用于各组方差不齐时，【平均值图】用于指定输出各组均数的线图，以直观地显示它们的差异，同时可辅助对均数间的趋势做出判断，【缺失值】用于定义分析中对缺失值的处理方法。

完成上述参数设置，点击【确定】即可查看结果。

04

单因素方差分析的结果该如何解读？

Part1：描述性统计

在SPSS 分析中，首先给出了因变量的描述性分析，其中包括每个水平的个案数、均值、标准差等信息。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/c4fde9a26b01e9be9f7d.gif)

Part2：方差齐性检验

SPSS使用了 Levenne 法进行方差齐性检验，当显著性>0.05时，可以认为方差齐。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/a9ec4e98f115bd08438e.gif)

Part3：单因素方差分析

在 ANOVA 表格中，展示了单因素方差分析的统计结果，如下图：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/4eec3cf849130f5fd8f8.gif)

本案例中，显著性结果为 0.000，小于 0.01，由此可以认为3个公司生产的灯泡使用寿命总体均值存在显著差异，拒绝H0假设。

Part4：平均值相等性稳健检验

当方差不齐时，可以选用 Welch（韦尔奇）的校正统计结果。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/31f7e42cec85748b6997.gif)

Part5：平均值图

各组间样本均数的折线图可以更直观地展现各组样本的大小关系及其与相应的分组变量间的关系，如下图：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/31f7e42cec85748b6997.gif)

Part6：单因素方差分析结论

通过以上的分析，我们可以发现不同公司生产的灯泡在使用寿命上存在显著差异，我们研究结果部分可以进行如下阐述：

研究使用单因素方差分析对不同公司所生产的灯泡使用寿命进行统计分析，结果发现不同公司生产的灯泡寿命在0.01 显著性水平下呈现显著差异。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/280ccd7a39c8fec73ea0.jpg)

寒冰射手 硕博数据分析
