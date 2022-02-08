$ry(".submit").click(() => {
    const email = $ry(".email").val();
    const password = $ry(".password").val();
    if (!email || !password) {
        $ryTools.notify({
            description: "账号或密码为空",
            type: "error",
        });
        return;
    }

    axios({
        method: "post",
        url: "/api/account/login",
        data: qs.stringify({
            email,
            password,
        }),
    }).then(({ data: res }) => {
        if (res.code === 0) {
            $ryTools.notify({
                description: res.msg,
            });
            setTimeout(() => {
                window.location.replace($ryTools.getUrlValue("path") || "/");
            }, 1000);
        } else {
            $ryTools.notify({
                description: res.msg,
                type: "error",
            });
        }
    });
});
