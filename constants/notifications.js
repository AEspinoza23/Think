import IconsSvg from '~/constants/icons-svg';

const notificationType = [
  {
    name: 'SYSTEM_NOTIFICATION',
    value: 1,
    icon: IconsSvg.notificationSystem
  },
  { 
    name: 'NEW_REFERRAL_NOTIFICATION',
    value: 2,
    icon: IconsSvg.notificationAffiliates,
    route: 'profile-affiliates'
  },
  {
    name: 'PROCESS_STATUS_NOTIFICATION',
    value: 3,
    icon: IconsSvg.notificationContract,
    route: 'profile-services-details-slug'
  },
  {
    name: 'NEW_OFFER',
    value: 4,
    icon: IconsSvg.notificationRange,
    route: 'offer-slug'
  },
  {
    name: 'FEEDBACKS',
    value: 5,
    icon: IconsSvg.notificationRate,
    route: 'offer-slug'
  },
  {
    name: 'PRODUCTS_EXPIRE',
    value: 6,
    icon: IconsSvg.notificationExpire,
    route: 'offer-slug'
  },
  {
    name: 'NEW_BALANCE_RECORD',
    value: 7,
    icon: IconsSvg.notificationBalance,
    route: 'profile-balance-details-slug'
  },
  {
    name: 'PURCHASE_COMPLETED',
    value: 8,
    icon: IconsSvg.notificationBalance,
    route: 'profile-balance'
  },
]
export default notificationType;