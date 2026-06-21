import React from 'react';
import useOrders from '../../hooks/useOrders';
import useProducts from '../../hooks/useProducts';

const TIMELINE_STEPS = [
  { key: 1, titleKey: 'step1Title', descKey: 'step1Desc', id: 'stepNode1' },
  { key: 2, titleKey: 'step2Title', descKey: 'step2Desc', id: 'stepNode2' },
  { key: 3, titleKey: 'step3Title', descKey: 'step3Desc', id: 'stepNode3' },
  { key: 4, titleKey: 'step4Title', descKey: 'step4Desc', id: 'stepNode4' }
];

const triggerSupportChat = (locale) => {
  const waNumber = '+201000000000';
  const text = encodeURIComponent(
    locale === 'en'
      ? "Hello Vape Cairo, I need assistance with my delivery order."
      : "مرحباً فيب القاهرة، أحتاج مساعدة بخصوص طلبي."
  );
  window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
};

export const OrderTracking = () => {
  const { activeOrder } = useOrders();
  const { t, locale } = useProducts();

  if (!activeOrder) return null;

  const getNodeClass = (stepKey) => {
    if (stepKey < activeOrder.stage) return 'timeline-node completed';
    if (stepKey === activeOrder.stage) return 'timeline-node active';
    return 'timeline-node';
  };

  return (
    <section className="order-tracking-panel" id="orderTrackingSection" style={{ display: 'block' }}>
      <div className="tracking-card">
        <div className="drawer-title" style={{ marginBottom: '20px' }}>{t('orderTracking')}</div>

        <div className="tracking-summary">
          <div>
            <div className="summary-block-title">{t('trackId')}</div>
            <div className="summary-block-val" id="trackRefVal">#{activeOrder.referenceId}</div>
          </div>
          <div>
            <div className="summary-block-title">{t('trackPlaced')}</div>
            <div className="summary-block-val" id="trackPlacedVal">{activeOrder.time}</div>
          </div>
          <div>
            <div className="summary-block-title">{t('trackAddress')}</div>
            <div className="summary-block-val" id="trackAddressVal">{activeOrder.address}</div>
          </div>
          <div>
            <div className="summary-block-title">{t('trackAmount')}</div>
            <div className="summary-block-val" id="trackAmountVal">{activeOrder.total} EGP</div>
          </div>
        </div>

        {/* Timeline Nodes */}
        <div className="timeline-status">
          {TIMELINE_STEPS.map(step => (
            <div className={getNodeClass(step.key)} id={step.id} key={step.key}>
              <div className="timeline-bullet"></div>
              <div className="timeline-desc-title">{t(step.titleKey)}</div>
              <div className="timeline-desc-text">{t(step.descKey)}</div>
            </div>
          ))}
        </div>

        <button className="btn-tracking-whatsapp" onClick={() => triggerSupportChat(locale)}>
          💬 <span>{t('trackHelpBtn')}</span>
        </button>
      </div>
    </section>
  );
};
export default OrderTracking;
