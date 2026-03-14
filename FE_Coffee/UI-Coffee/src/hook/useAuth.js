import { useMutation } from '@tanstack/react-query';
import { requestOptService, resetPasswordService, verifyOtpService } from '../apiServices/authSevices.js';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export const useRequestOpt = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (email) => {
            return await requestOptService(email);
        },
        onSuccess: (data) => {
            console.log("ppp", data);
            localStorage.setItem('resetMail', data?.data?.email);
            navigate('/verify-otp');
        },
        onError: (error) => {
            console.log("Thất bại", error)
        }
    })
}

export const useVerifyOpt = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({ email, otp }) => {
            return await verifyOtpService(email, otp);
        },
        onSuccess: (data) => {
            localStorage.setItem('resetToken', data?.data?.resetToken);
            localStorage.removeItem('resetMail');
            navigate('/reset-password');
        },
        onError: (error) => {
            console.log("Thất bại", error)
        }
    })
}

export const useResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({ resetToken, newPassword }) => {
            return await resetPasswordService(resetToken, newPassword);
        },
        onSuccess: () => {
            navigate('/login');
            localStorage.removeItem('resetToken');
        },
        onError: (error) => {
            console.log("Thất bại", error)
        }
    })
}