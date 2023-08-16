import ButtonUpdateStatusOrderMenu from '@/Componens/Table/ButtonUpdateStatusOrderMenu';

export function isHasUpdateButtonOneField(row, column) {
  if (column === 'status') {
    return <ButtonUpdateStatusOrderMenu orderItem={row} />;
  } else {
    return <></>;
  }
}
