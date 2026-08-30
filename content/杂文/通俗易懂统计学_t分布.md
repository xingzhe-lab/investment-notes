---
title: "通俗易懂统计学_t分布"
aliases: ["通俗易懂统计学_t分布"]
---

# 通俗易懂统计学_t分布

通俗易懂统计学_t分布

2026年6月30日

12:44

通俗易懂统计学|t分布

一、t分布的故事

t分布的故事，始于爱尔兰一家啤酒厂。

一百多年前，酿酒师和统计学家William Sealy Gosset，在研究不同批次的小麦的酿酒差异，只能做少数几次实验（比如只测三四批大麦），样本量太小。当时统计学界认为小样本毫无价值，这让他很头疼。

Gosset埋头钻研酒厂的数据，最终发现：当用少量样本去估计总体时，其均值的分布规律并非当时公认的“正态分布”（卡尔·皮尔逊等人为主），而是一种更“保守”、尾巴更厚的曲线。这就能更准确地评估小样本的可靠性。

由于公司保密规定，1908年，他只好匿名发表论文，署名“Student”（学生）。论文起初被统计学权威忽视，认为小样本问题无足轻重。后来，英国统计学和遗传学家Ronald Fisher读到这篇文章，意识到其巨大价值。他完善了数学证明，并大力推广，最终将其命名为“Student's t分布”和“t检验”。

从此，只要样本量有限的比较，研究者都会用到它。这个故事也告诉我们，有些被权威忽视的地方，会蕴含一些可探索的未知。

二、t分布与z分布

- z分布（正态分布）：你家小区平均身高是170cm，物业有完整的业主档案，知道标准差是5cm。这时研究身高问题就用z分布。

- t分布：你随机拉住小区里5个邻居，量了他们的身高，想用这5个人的数据猜全体业主的情况。因为你不知道真实标准差，只能用5个人估算，这时就用t分布。

想象你要估算全校学生的平均成绩：

- z分布：你已经知道了全校学生的整体波动情况（标准差），只需要处理抽样误差。

- t分布：你不知道全校的真实波动，只能靠手里有限的样本（比如随机抽10个同学）来估算：

- 平均分是多少

- 波动有多大

如何应用？

- 用z分布：已知总体标准差 或大样本（n>30）

- 用t分布：未知总体标准差 、小样本

- 大样本时t分布会接近z分布。

t分布的曲线由自由度控制，不同自由度的t分布曲线可以用下面的R代码演示

# 设置x轴范围

x <- seq(-4, 4, length = 200)

# 定义要对比的自由度

df_values <- c(1, 2, 5, 10, 30, 100)

# 绘制正态分布曲线作为基准

plot(x, dnorm(x), type = "l", lwd = 3, col = "black",

main = "不同自由度下的t分布曲线对比",

xlab = "t值", ylab = "概率密度", ylim = c(0, 0.42))

# 绘制不同自由度的t分布曲线

colors <- rainbow(length(df_values))

for(i in 1:length(df_values)) {

lines(x, dt(x, df = df_values[i]),

col = colors[i], lwd = 2, lty = i)

}

# 添加图例

legend("topright",

legend = c("正态分布", paste("df =", df_values)),

col = c("black", colors),

lwd = c(3, rep(2, length(df_values))),

lty = c(1, 1:length(df_values)),

cex = 0.8)

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/aa76c3397f05348fbf7a.gif)

- 黑色粗线：标准正态分布（z分布）

- 彩色线：不同自由度下的t分布曲线

- 自由度越小，曲线越"扁平"，尾部越厚

- 随着自由度增加，t分布逐渐接近正态分布

- 当df=100时，t分布与正态分布几乎重合

再来看看t分布和z分布的对比图：

sample_size <- 5

x <- seq(-4, 4, length.out = 200)

z_curve <- dnorm(x)  # 标准正态分布

t_curve <- dt(x, df = sample_size - 1)  # t分布（自由度为4）

plot(x, z_curve, type = "l", lwd = 3, col = "blue",

main = "z分布（正态） vs t分布（小样本）",

xlab = "值", ylab = "密度", ylim = c(0, 0.42))

lines(x, t_curve, col = "red", lwd = 3, lty = 2)

abline(v = c(-1.96, 1.96), col = "blue", lty = 3)  # z分布的临界值

abline(v = c(-2.78, 2.78), col = "red", lty = 3)   # t分布的临界值

legend("topright",

legend = c("z分布 (正态)", "t分布 (df=4)", "z临界值 ±1.96", "t临界值 ±2.78"),

col = c("blue", "red", "blue", "red"),

lty = c(1, 2, 3, 3), lwd = c(3, 3, 1, 1))

结果如下：

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/c156192dd432496d5c3a.gif)

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/essays/115ead9dc30f6d968a4a.jpg)

Original 一起学习 水陆两栖科研娃
