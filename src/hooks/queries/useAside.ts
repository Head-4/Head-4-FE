import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getUserEmail from '../../apis/login/getUserEmail';
import getNotificationAllow from '../../apis/fcm/getNotificationAllow';
import patchAllowNotification from '../../apis/fcm/patchAllowNotification';
import { handleAllowNotification } from '../../utils/firebaseConfig';

export const useAside = () => {
  const queryClient = useQueryClient();

  // 이메일 조회
  const emailQuery = useQuery({
    queryKey: ['email'],
    queryFn: getUserEmail,
    staleTime: 10 * 60 * 1000, // 10분
  });

  // 알림 허용 조회
  const notificationAllowQuery = useQuery({
    queryKey: ['notificationAllow'],
    queryFn: getNotificationAllow,
    staleTime: 10 * 60 * 1000, // 10분
  });

  // 알림 허용 여부 수정
  const updateNotificationMutation = useMutation({
    mutationFn: (allow: boolean) => patchAllowNotification(allow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationAllow'] });
    },
  });

  // FcmToken 설정
  const patchFcmTokenMutation = useMutation({
    mutationFn: () => handleAllowNotification(),
  });

  return {
    email: emailQuery.data?.data,
    notificationAllow: notificationAllowQuery.data?.data,
    updateNotification: updateNotificationMutation.mutate,
    patchFcmToken: patchFcmTokenMutation.mutateAsync,
  };
}; 