# chart-perf

> G2 栈的性能测试监控工具！防止在迭代过程中性能出现急剧下降！ 线上[运行地址](https://git.hust.cc/chart-perf/)。


## 设计原型

![](https://cdn.nlark.com/yuque/0/2021/png/86342/1611302802385-2480e366-4d5d-4d61-8f08-331b84cc3161.png)

说明：

 - 头部、尾部样式按照主流网站，保证基本好看即可
 - 内容部分分成两部分：
    - 配置：选择引擎（G2, G2Plot, ECharts） 三种；选择 Case（折线图、面积图、柱形图、散点图）
    - 开始执行（执行过程中，页面增加 loading 框，过程中会进行串行运行性能测试，时间可能比较长）
    - 完成之后，获得数据进行图表的绘制（按照 Case 分成不同的图）
      - X 轴是数据量，从 200 ~ 20000
      - Y 轴是渲染时间
      - 按照图表引擎的类型分组


## 技术栈

 - 使用 Ant Design 进行 UI 绘制
 - 样式使用 less 文件
 - 图表绘制使用 Ant Design Charts
 - 性能测试的 Case 使用 iframe 沙箱运行


## 运行

```bash
# 安装依赖
$ tnpm i

# 运行，本地启动
$ tnpm start
```

## License

MIT@[hustcc](https://github.com/hustcc).