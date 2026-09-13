import Skeleton, {
  SkeletonRow,
  SkeletonStack,
} from "@/components/ui/Skeleton";
import styles from "@/styles/admin-shared.module.css";

export default function AdminBookDetailsLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <Skeleton variant="heading" width={90} height={14} />
        </div>
        <div className={styles.pageActions}>
          <Skeleton variant="input" width={96} height={32} />
          <Skeleton variant="input" width={104} height={32} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionBody}>
          <div className="flex gap-5">
            <Skeleton
              variant="block"
              width={80}
              height={110}
              style={{ borderRadius: 8 }}
            />
            <div className="flex-1">
              <Skeleton variant="heading" width={280} height={20} />
              <div className="mt-2">
                <Skeleton variant="text" width={220} height={12} />
              </div>
              <div className="mt-3 flex gap-1.5">
                <Skeleton variant="button" width={72} height={22} />
                <Skeleton variant="button" width={88} height={22} />
                <Skeleton variant="button" width={64} height={22} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <Skeleton variant="input" width={72} height={30} />
        <Skeleton variant="input" width={96} height={30} />
        <Skeleton variant="input" width={80} height={30} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <Skeleton variant="heading" width={150} height={16} />
        </div>
        <div className={styles.sectionBody}>
          <SkeletonStack>
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i}>
                <Skeleton variant="text" width={120} height={12} />
                <Skeleton variant="text" width={200} height={12} />
              </SkeletonRow>
            ))}
          </SkeletonStack>
        </div>
      </div>
    </div>
  );
}