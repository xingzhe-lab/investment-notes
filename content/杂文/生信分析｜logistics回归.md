---
title: "生信分析｜logistics回归"
aliases: ["生信分析｜logistics回归"]
---

# 生信分析｜logistics回归

生信分析｜logistics回归

2026年6月30日

12:44

生信分析｜logistics回归

本篇介绍logistic回归前4部分，关于logistic回归的介绍一共有12部分的内容，后续会慢慢更新，主要包括：

1.知识回顾：多元回归方法

2.为什么要做logistic回归

3.什么是logistic回归

4.回归模型公式及图示

5.logistic回归的参数估计和假设检验

6.自变量选择

7.分类

8.样本含量估计

9.应用

10.模型使用注意点

11.常见思路

12.案例+模板

1.知识概览：多元回归方法

矫正混杂因素最常用的手段是多元回归，顾名思义，多元指有多个因素，即把多个混杂因素放在一个模型中，用模型来判断这些混杂因素是不是对结局变量有独立贡献。常见的多元回归模型有：多元线性回归、cox回归以及logistic回归。

多元线性回归：因变量是连续变量，比如说身高体重；

cox回归：用于生存分析的统计模型，以生存结局和生存时间为因变量，可以同时分析多个因素对生存期的影响；

logistics回归：因变量为二分类或者多分类，只关心结局变量是否发生，不关心什么时间发生，在病例对照/横断面研究比较常用到。

2.为什么要做logistic回归

当研究因果关系时，如果因变量（即结局）是一个定量资料，那就可以建立因变量和自变量的多元线性关系。但是若因变量为分类变量，那么因变量与自变量之间就丧失了这种线性关系。我们看一下这几张图，大家就会有一个直观感受。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/a5c9bd4a602f962ebc84.gif)

前两张是线性回归，可以显著看到不同X对应的Y不一样，无论是一元线性回归还是多元线性回归，这些点是可以拟合成线性关系的。而最右边这张图我们发现它的Y只有0和1，即无论X是什么，Y只有两种。这种情况是无法拟合成线性关系的。

此外，在二分类问题中，通常希望模型能够给出属于某一类别的概率。 线性回归模型给出输出值是可能超出[0,1]的范围，并不能直接代表属于某一类别的概率。 且在二分类问题中，我们需要一个明确的决策边界来区分两个类别。 线性回归模型虽然可以拟合成一条直线（或超平面），但这条直线并不直接对应于最优的决策边界，因为它不是基于最小化分类误差率或最大化分类准确率的。 而Logistic回归模型的输出是一个介于0和1之间的概率值，这个概率值可以被解释为样本属于某一类别的可能性，并且可以将线性模型的输出转换为概率。

3.logistic回归是什么

百度百科定义：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/166136b533b9bb987477.gif)

医学统计学第5版书：定义logistic回归属于概率型非线性回归。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/41ca5bfb2fb1360c0224.gif)

我们就记住它是一个概率型回归模型也是机器学习中的一个算法就可以了。

简单理解：logistic回归是以某一事件发生与否的概率为因变量，以影响结局Y的因素为自变量建立的回归模型，可以用来分析某事件发生的概率与自变量之间的关系。在流行病学研究中，经常需要分析疾病与各危险因素之间的关系，需要排除一些混杂因素的影响。如果它的因变量是二分类或者多分类的话我们是可以使用logistic回归来分析的。如果只是它的自变量是二分类变量，我们可以使用线性回归的。

4.回归模型公式及图示

在logistic回归中，结局Y是二分类变量，取值为1和0；1代表出现阳性结果，0代表出现阴性结果，现在有m个自变量会影响结局Y的取值，假设这些自变量导致阳性结果发生的概率为P，可以记为：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/58924da829500c8306b9.gif)

那么logistic回归模型就可以表示为：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/516deea55f257adc56c6.gif)

也可以表示成：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/ae0be7d32ff3279b713b.jpg)

注：exp指的是以e为底的幂函数

常见的logistic回归模型是：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/420cc5e6c583cf87e7c4.jpg)

即：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/3a6df5334644b2aacb12.gif)

取的是比值的自然对数。

公式左端：阳性与阴性结果发生概率之比的自然对数，称为 logit 变换，记为 logitP 。因为概率P的取值范围是在 0-1 之间，所以这个logitP 是没有数值界限的。

公式右边：线性回归，其中β0是常数项表示模型中所有自变量均为0时，ln[P/(1-P)]的值，以流行病学研究为例，常数项β0即表示暴露剂量为0时个体发病与不发病概率之比的自然对数。βj（j＝1, 2, …， m) 指的是回归系数，表示在控制其他自变量时，自变量Xj改变一个单位时 logitP 的改变量。其实βj就是自变量Xj改变一个单位后与改变之前的比值比的自然对数。

例：比较某一个有危险因素Xj和没有危险因素Xj的发病情况（假定其他因素的水平相同），1表示暴露，0表示非暴露，其比值比的自然对数的推导公式是：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/c814bafc6cdbe6ac86e3.jpg)

OR值比较常见，很多统计分析中会涉及到，即比值比，也可以叫优势比

根据公式可以看出：

当βj=0时，ORj=1，说明暴露因素Xj对疾病或其他结局的发生不起作用；

当βj>0时，ORj>1，说明暴露因素Xj对疾病或其他结局的发生起促进作用，是一个危险因子；

当βj<0时，ORj<1，说明暴露因素Xj对疾病或其他结局的发生起抑制作用，是一个保护因子。

由于OR值的大小与模型中的常数项β0无关。在危险因素分析中可被视为无效参数。对于慢性疾病如心脑血管疾病、恶性肿瘤等，由于其在人群中所占的比例P很小，OR值可以作为相对危险度RR值的近似估计，即

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/174800dbd28576289cbe.gif)

logistic的图一般为：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/2041b97bdc7ef8f67dd0.gif)

绘制方法基于先前的公式：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/e3ef23e6e3385c0327ab.gif)

用Z表示m自变量的线性组合即：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/4256ef7b6c319490246a.gif)

原公式即可转换为：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/cc2a2323cc419050c74a.jpg)

则Z与P之间关系的曲线就是这样的一个s型曲线：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/e96506858041f5fbb012.gif)

这个新函数也叫sigmoid函数或者激活函数，它在机器学习和深度学习领域非常重要，经常被用作神经网络的激活函数。sigmoid函数的图形是这样的，和logistic回归的图像很相似。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/cf24b56235ab59bfd797.gif)

回到logistic回归上，根据这个图可以看到

当Z趋于+∞时，P接近于1；

当Z趋于-∞时，P接近于0；

P的变化始终是在0~1范围之内，并且随着Z的增加或减少该图是以点（0,0.5）为中心呈对称S形变化。曲线中间部分有点近似线性回归。

这个图形的特点是缓急缓，曲线前部分随着横轴的增加，Y轴的变化是很小的，中间迅速增加，最后又趋于平缓。
