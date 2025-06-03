import { regionList } from '../utils/regionData';

export function getRegionCodeFromKeyword(keyword) {
    if (!keyword) return null;
    const trimmed = keyword.trim();

    // 공백 기준으로 분해: 예) "부산 해운대"
    const words = trimmed.split(/\s+/);

    // 1. 시군구 먼저, 이름 긴 순으로 정렬
    const sortedRegion = [...regionList].sort(
        (a, b) => b.name.length - a.name.length,
    );

    // 2. 정확한 이름 포함 or 끝에서 일치
    for (const region of sortedRegion) {
        // 예: "해운대" vs "해운대구"
        const nameWithoutSuffix = region.name.replace(/(구|시|군)$/, ''); // ex. "해운대"

        if (
            words.some(
                (word) => word === region.name || word === nameWithoutSuffix,
            ) &&
            region.sigunguCode !== undefined
        ) {
            console.log('🟢 시군구 매칭:', region);
            return {
                areaCode: region.areaCode,
                sigunguCode: region.sigunguCode,
            };
        }
    }

    // 3. 시도 매칭
    for (const region of sortedRegion) {
        if (words.some((word) => word === region.name)) {
            console.log('🟡 시도 매칭:', region);
            return {
                areaCode: region.areaCode,
            };
        }
    }

    console.warn('🔴 매칭 실패:', keyword);
    return null;
}
