import { prismaConnect, prismaDisconnect } from "@template/database";
import { showMemoryUsage } from "./shared/utils";
import expressApp from "./shared/configs/express.config";

async function bootstrap() {
  try {
    await prismaConnect(); // 1) 서버 시작 전에 DB 연결
    console.log("✅ 데이터베이스 연결 성공!");
  } catch (error) {
    console.error("❌ 데이터베이스 연결 실패:", error);
    process.exit(1);
  }

  const PORT = Number(process.env.SERVER_PORT) || 3000;

  const server = expressApp.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Memory usage: ${showMemoryUsage()}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}. Graceful shutdown...`);
    // 2) 새 커넥션 수락 중단
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
    // 3) DB 연결 종료
    await prismaDisconnect();
    process.exit(0);
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}
bootstrap().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
