
export async function POST(req: Request) {
    const { prompt } = await req.json();

    // Encoder to convert string to Uint8Array
    const encoder = new TextEncoder();

    // Create a readable stream
    const customStream = new ReadableStream({
        async start(controller) {
            const dummyText = `
# [멀티버스 No. 824] 스타트업 CEO가 된 당신

당신이 선택한 "취업 대신 창업"의 길은 결코 순탄하지 않았습니다. 
처음 3년은 라면으로 끼니를 때우며 반지하 사무실에서 밤을 새웠습니다.

하지만 당신의 아이디어는 결국 빛을 발했습니다.
현재 당신은 유니콘 기업 'NextLevel'의 CEO로서, 
수많은 젊은이들에게 영감을 주는 인물이 되었습니다.

행복 지수: 85%
주요 사건:
- 2024년: 첫 투자 유치 성공
- 2026년: 글로벌 시장 진출
- 현재: 타임지 선정 '영향력 있는 100인'

물론, 잃은 것도 있습니다. 
바쁜 일정 탓에 가족과의 시간은 줄어들었고,
주말에도 마음 편히 쉬지 못하는 날들이 많습니다.

하지만 당신은 지금의 삶을 후회하지 않습니다. 
당신이 만든 서비스가 세상을 바꾸고 있으니까요.
      `;

            const chunks = dummyText.split("\n");

            for (const chunk of chunks) {
                // Simulate processing delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Enqueue the chunk with a newline
                controller.enqueue(encoder.encode(chunk + "\n"));
            }

            controller.close();
        },
    });

    return new Response(customStream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}
