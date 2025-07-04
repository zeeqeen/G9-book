# Bevy



我们需要在 `cargo.toml` 里显式指定 `NativeActivity` 特性而非默认的 `GameActivity` 以支持老旧的 `armebi-v7a` 架构安卓设备。见 [armebi-v7a, arm64-v8a, x86 的区别](https://stackoverflow.com/questions/56824557/what-is-the-difference-between-armeabi-v7a-arm64-v8a-x86)

执行 `cargo ndk` 和 `gradlew build` 命令

## 设计
* 定义游戏状态，比如 `MainMenu`, `InGame`, `Paused`；用这个状态控制哪些系统在什么时候运行。
* 玩家控制，需要读取玩家输入，据此更新玩家的某些属性
* 物理世界碰撞，给需要交互的 `entity` 如玩家、敌人、墙壁、道具等添加 `component`；监听碰撞事件；设置物理世界。
* 游戏逻辑与规则，这是核心玩法，通过编写各种 `system` 实现，包括记分系统、生命/伤害系统、胜利/失败条件。
* 用户界面（UI），包括主菜单（创建按钮和标题），HUD（在 `InGame` 状态下显示玩家的属性，比如生命值、弹药、分数等信息），暂停/结束菜单。
* 关卡/世界的构建，从文件加载或者程序化生成


