import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from '@umijs/max'
import { getLogin } from "@/services/admin/userController";

export default (props: any) => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    useEffect(() => {
        check()
        console.log(1111);
        
    }, [])
    const check = async () => {
        const res = await getLogin()
        if(res.success) setIsLogin(true)

    }
    if (isLogin) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}
