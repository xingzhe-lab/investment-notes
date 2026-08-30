---
title: "为什么Jeff Dean从Google离职引起这么大的轰动？"
aliases: ["为什么Jeff Dean从Google离职引起这么大的轰动？ - ITer 的回答"]
---

# 为什么Jeff Dean从Google离职引起这么大的轰动？

为什么Jeff Dean从Google离职引起这么大的轰动？ - ITer 的回答

源网页

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/newpart2/22134cce9a5a95a2c736.jpg)

alt="Image">

Google 每年离职的人多了去了。

但 2026 年 8 月 5 日，Jeff Dean 宣布离开之后，Alphabet 股价跌超 4%，程序员社区像集体掉了一块地基，连“Google 要完”的声音都冒出来了。

这反应看着有点离谱。

毕竟 Jeff Dean 不是 CEO，不负责卖广告，也不直接决定你手机里的 Gemini 今天能不能写好一封邮件。一个首席科学家换个地方创业，凭什么闹得像 Google 被拆了一半？

先说结论啊：因为 Jeff Dean 对 Google 的意义，从来不是一个职位，而是一整套“把不可能的大规模计算变成日常工具”的工程能力。

更麻烦的是，这次走的还不只他一个。

Google 失去的是一组从搜索时代一路搭到 AI 时代的核心建造者；而他们选择在 AI 竞争最激烈的时候，去公司外面重新开工。

这才是轰动真正的来源。

2026 年 8 月 5 日，Jeff Dean 确认结束约 27 年的 Google 生涯，创办一家名为 Discovery Loop 的 AI 公司。

和他一起离开的，还有 Google Senior Fellow Sanjay Ghemawat、Google DeepMind 副总裁 Oriol Vinyals，以及 Google Brain 联合创始人 Quoc Le。

这家公司不是普通商业公司，而是公共利益公司。它想做的也不是再造一个聊天机器人，而是用 AI 自动化科学和工程里的实验闭环：提出假设、设计实验、运行验证、读取结果，再根据结果继续下一轮。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/newpart2/ef7dc1c1939fbd261f0a.jpg)

alt="Image">

有意思的地方来了。

Google 不但没有和这群人割席，还会投资 Discovery Loop，并成为它的云计算合作方。

所以这不是“Jeff Dean 怒而出走、转头暴打老东家”的爽文。公开信息更接近一次友好分拆：人离开组织，项目获得独立空间，Google 继续保留资本和算力上的连接。

Jeff Dean 给出的理由也很直接。按照《纽约时报》2026 年 8 月 5 日采访的转述，在上市公司内部做研究，决策终究要面对公司的财务利益；独立出去之后，他可以把更多注意力放在短期未必赚钱、但可能带来科学突破的方向上。

这句话没有控诉 Google。

但它把大公司最尴尬的矛盾摊开了：前沿研究需要允许大量失败，上市公司却必须不断解释投入什么时候变成收入。

## Jeff Dean 不是“在 Google 做过 AI”，他参与造了 Google 的地基

Google Research 的人物页面写得很克制：Jeff Dean 1999 年中加入 Google，后来担任 Google Research 与 Google DeepMind 首席科学家。

下面那一长串项目却一点都不克制：MapReduce、Bigtable、Spanner、LevelDB、DistBelief、TensorFlow、Pathways、TPU、Google Brain……

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/newpart2/12347e08a61ea4830a3a.jpg)

alt="Image">

这堆名字普通人看着像技术报菜名。

翻译成人话，它们解决的是同一件事：当一家公司大到一台电脑装不下数据、一个机房算不完任务、机器还会三天两头坏掉时，怎么让成千上万台机器像一台可靠的电脑一样工作。

早期 Google 最大的问题，不是搜索算法不聪明，而是互联网长得太快。

网页越来越多，索引越来越大，廉价服务器数量越来越夸张。单台机器偶尔坏一次不稀奇，可当机器多到一定规模，“偶尔”就会变成“每时每刻”。硬盘会挂，内存会出错，任务跑一半会消失。

2000 年，Google 的网页索引系统曾长时间停摆，搜索结果一度严重落后于真实互联网。《纽约客》2018 年的长篇报道记录了 Jeff Dean 和 Sanjay Ghemawat 如何在底层二进制数据中追查硬件错误，并帮助系统恢复。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/newpart2/01dc5ac159cd613f8aa2.jpg)

alt="Image">

这件事真正改变他们的，不是修好一个 bug。

而是他们意识到：Google 以后不能把硬件故障当意外，必须把故障当日常。

于是，很多后来决定 Google 规模的系统，都是按这个思路长出来的。

## MapReduce：把“几千台电脑一起干活”变成普通工程师也能用

2004 年，Jeff Dean 和 Sanjay Ghemawat 发表 MapReduce 论文。

它的价值不在于发明了分布式计算，而在于把分布式计算最折磨人的部分藏了起来。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/newpart2/180e28f52fa127d73e75.jpg)

alt="Image">

你可以把它想成给一座巨型中央厨房写菜谱。

以前，厨师不仅要知道怎么切菜、怎么炒，还得自己安排哪个灶台先开、哪个人去补位、某口锅坏了以后怎么重做。

MapReduce 把工作拆成“分发处理”和“汇总结果”两类步骤。程序员只需要描述任务怎么拆、结果怎么合；至于任务扔给哪台机器、机器挂了怎么重试、数据怎么搬运，由系统兜底。

论文披露，当时典型任务已经能在数千台普通机器上处理数 TB 数据，Google 每天运行的 MapReduce 任务超过一千个。

这个规模放到今天不算吓人。

但在 2004 年，它相当于把少数基础设施专家才能驾驶的工程机械，改成了普通程序员也能开的自动挡。

Google 的搜索索引、地图瓦片、视频处理和海量日志分析因此更容易扩张；MapReduce 还启发了 Hadoop 等外部开源生态。

所以 Jeff Dean 的影响不是“亲手写了每个 Google 产品”。

而是他和搭档做出了别人用来写产品的工具。

## Bigtable 和 Spanner：没有可靠的数据层，AI 连饭都吃不上

如果 MapReduce 解决“怎么算”，Bigtable 解决的就是“海量数据往哪放、怎么随时取”。

2006 年的 Bigtable 论文写得很清楚：它面向 PB 级数据和数千台普通服务器，Google 的网页索引、Google Earth、Google Finance 等项目都曾使用它。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/newpart2/e01fc393da7ad9d446d6.jpg)

alt="Image">

后来，Spanner 又把数据库扩展到跨地域的数据中心，同时维持强一致性。Google Research 的人物页称，Spanner 被数百个项目广泛使用，支撑 Google 很大一部分产品。

说白了，用户看到的是搜索框、地图、邮箱和广告。

Jeff Dean 与同事们长期处理的，却是地下管网：数据怎么流、任务怎么跑、机器坏了谁接手、全球多个机房怎么对上同一本账。

平时没人会为地下管网欢呼。

可一旦造管网的人离开，所有人才突然想起来——楼上每一个漂亮应用，都建立在这些看不见的东西上。

## 他最稀缺的地方，是把基础设施经验带进了 AI

很多工程师只擅长一个时代。

有人懂搜索，有人懂数据库，有人懂神经网络。Jeff Dean 特别的地方，是他把上一代互联网的规模化方法，接到了下一代 AI 上。

2011 年，他联合创办 Google Brain。

当时深度学习还远没有今天这么热。神经网络的潜力早就有人知道，真正的难题是：模型需要更多数据、更大计算量和更稳定的训练系统。算法有想法，机器却扛不住，等于菜单写得很高级，厨房只有一口家用炒锅。

Jeff Dean 这种系统工程师进场之后，问题就变了。

不是“神经网络有没有用”，而是“怎样把它扩到足够大，让效果真正出现”。

DistBelief 是早期答案，TensorFlow 是更成熟、也更影响整个行业的答案。

![image](https://raw.githubusercontent.com/xingzhe-lab/investment-notes/main/static/newpart2/973ffdd7316857438918.jpg)

alt="Image">

Google Research 的人物页中，Jeff Dean 称自己是初代 TensorFlow 的主要设计者和实现者之一，也推动了它在 2015 年开源。TensorFlow 把模型的计算图分配到 CPU、GPU 和 TPU 等不同设备上，让研究者可以在从手机到大型计算集群的不同环境中训练和部署模型。

你今天当然可以说，研究社区的主流工具已经发生变化。

但 TensorFlow 的历史意义并不会因此消失：它把 Google 内部的大规模机器学习能力，变成全世界研究者和开发者都能拿到的工具。

再往后，Jeff Dean 又参与 Pathways、TPU 和大模型系统方向。

这就是为什么业内把他看得这么重。

他不是只懂模型，也不是只懂机器。他懂得怎样把一个研究想法，变成能在海量硬件上长期运行、最后进入真实产品的系统。

这种人，本来就少。

在同一家公司连续做 27 年、还跨过搜索、云计算和 AI 三个时代的人，更少。

## 真正让人后背发凉的，是这次走的是“一套组合”

如果只有 Jeff Dean 一个人退休式创业，震动不会这么大。

这次被放大，是因为 Discovery Loop 的创始阵容几乎把 Google 两代技术能力打包带走了。

Sanjay Ghemawat 是 Jeff Dean 长期合作的系统工程搭档。MapReduce、Bigtable、Spanner、TensorFlow 等项目的作者名单里，二人的名字反复一起出现。

《纽约客》那篇报道把他们形容成一组互补的工程组合：Jeff 擅长快速提出大胆方案，Sanjay 擅长把系统打磨得清晰、稳定、能长期生长。

Oriol Vinyals 则代表更靠近现代模型的一侧。他长期参与序列到序列学习、大模型和 Gemini 相关工作，离职前是 Google DeepMind 副总裁。

Quoc Le 联合创办 Google Brain，也是大规模神经网络、表征学习和机器学习系统的重要研究者。

这四个人凑在一起，结构就很清楚了：底层分布式系统、机器学习基础设施、现代模型研究、研究组织经验，全有。

这不像挖走一名前锋。

更像一支球队把建训练基地的人、设计战术的人、带青年队的人和核心球员一起放了出去。

所以行业讨论的并不只是“Google 少了四个厉害员工”。

大家真正盯着的是：这四个人为什么认为，下一轮科学 AI 的重大突破，更适合在一家新公司里完成？

## 为什么偏偏是现在，让市场反应这么大

Jeff Dean 离职发生在 Google AI 组织重组的同一天。

Demis Hassabis 不再承担 Google DeepMind 的日常 CEO 职责，转任主席，并成为 Alphabet 首席科学家；Koray Kavukcuoglu 负责 Google DeepMind 的执行工作，向 Sundar Pichai 汇报。

Google 对外强调，这些调整是为了让科学探索和 Gemini 产品路线都跑得更快，而且 Jeff Dean 创业与 Demis Hassabis 的职务变化没有直接关联。

但资本市场不会只看公司给每一块拼图写的说明书。

它看到的是同一张桌子上同时出现了几件事：顶级研究者成组离开、DeepMind 权力结构变化、Gemini 面临强敌、Google 还得继续投入巨额算力。

Alphabet 股价在消息后跌超 4%，可以说明市场确实受到了冲击。

但这里必须踩一脚刹车：这次下跌对应的是整套领导层变化，不能把每一分钱都算成“Jeff Dean 离职损失”。股价是市场情绪的温度计，不是离职价值的精确报价器。

同样，也不能因为几位传奇人物离开，就宣布 Google AI 已经崩了。

Google 还拥有全球最强的一批 AI 研究者、TPU、数据中心、云平台、搜索与 YouTube 等产品入口，以及足以持续投入的现金流。大公司不会因为一个人离开，第二天就不会训练模型。

但人才流动会暴露一种更慢的风险：真正顶级的研究者，愿不愿意继续把未来十年押在这套组织里。

## 这件事最值得看的，不是“Google 会不会立刻完”

对普通用户来说，Jeff Dean 离职不会让 Google 搜索明天变慢，也不会让 Gemini 账号突然消失。

它影响的是更长的技术路线。

大公司擅长把成熟技术推给几十亿人，却不一定擅长保护一个十年后才可能见效、期间还会反复失败的研究方向。创业公司可以只赌一个问题，大公司却同时背着季度业绩、现有产品、监管风险和内部资源分配。

Discovery Loop 想自动化科学实验闭环，这个目标听着很大。

大到现在还不能因为创始人阵容豪华，就默认它一定成功。

AI 能提出看似合理的假设，不等于它能稳定设计实验；能跑模拟，不等于能处理真实世界里脏乱的数据、昂贵的设备和失败的样本；能加速某个步骤，也不等于已经自动化了科学发现。

所以接下来真正要观察的，不是创始人还会拿多少融资，而是四件事：Discovery Loop 有没有跑通端到端实验闭环；Google 的投资和云合作能否给它足够算力又不限制独立性；Google DeepMind 的新执行结构能否按时交付 Gemini；以及还会不会有更多关键研究者离开。

聊到最后，Jeff Dean 离职之所以轰动，不是因为大家迷信一个技术英雄。

而是因为他代表了一种在今天越来越稀缺的能力：既能往下钻到机器、数据库和编译器，又能往上理解模型、研究方向和产品规模；既写过地基，也参与设计过楼顶。

Google 不会因为抽走一根柱子立刻塌掉。

可当一根参与承重 27 年的柱子，带着另外几根关键梁一起去隔壁建新楼，任何人都会抬头看一眼天花板。

这场离职真正刺眼的信号是：下一代重大技术突破，未必还会天然发生在那家曾经最会容纳突破的公司内部。

这不是 Google 已经失败的结论。

但它足够让整个 AI 行业安静几秒。

内容效果不满意？点此反馈

