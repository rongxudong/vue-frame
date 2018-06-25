<template>
    <div class="bg-style">
        <form class="password-main">
            <div class="basic">
                <div class="basic-form">
                    <div class="input-item">
                        <label>原密码</label>
                        <input type="password" class="input-style" name="password" autocomplete="off"
                               placeholder="请输入原密码" maxlength="16" onfocus="this.type='password'"/>
                    </div>
                    <div class="input-item">
                        <label>新密码</label>
                        <input type="password" class="input-style" name="newPassword" autocomplete="off"
                               placeholder="请输入新密码" maxlength="16" onfocus="this.type='password'"/>
                    </div>
                    <div class="input-item">
                        <label>确认新密码</label>
                        <input type="password" class="input-style" name="rePassword" autocomplete="off"
                               placeholder="请再次输入新密码" maxlength="16" onfocus="this.type='password'"/>
                    </div>
                    <div class="input-item">
                        <button type="button" class="set-psd-btn" value="确 定">确 定</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/_variable";

    .password-main {
        padding: 50px 0 200px;
        .set-psd-btn {
            width: 300px;
            height: 42px;
            color: #fff;
            border: 1px solid @base;
            background-color: @base;
        }
    }
</style>