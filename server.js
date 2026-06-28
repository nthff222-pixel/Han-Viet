const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/public')));

// ========== CORPUS ==========
const CORPUS = [
  {id:"G01",cat:"Mở đầu",ko:"안녕하세요! 댓글 보고 연락드려요 😊",rom:"Annyeonghaseyo! Daetgeul bogo yeonlagdeulyeoyo",vi:"Xin chào! Mình liên hệ vì thấy bạn để lại bình luận"},
  {id:"G02",cat:"Mở đầu",ko:"문의 주셔서 감사합니다!",rom:"Munui jusyeoseo gamsahamnida!",vi:"Cảm ơn bạn đã quan tâm/hỏi!"},
  {id:"G03",cat:"Mở đầu",ko:"어떤 상품에 관심 있으세요?",rom:"Eotteon sangpume gwansim isseuseyo?",vi:"Bạn quan tâm sản phẩm nào vậy?"},
  {id:"P01",cat:"Giá cả",ko:"가격이 얼마예요?",rom:"Gagyeogi eolmayeyo?",vi:"Giá bao nhiêu vậy?"},
  {id:"P02",cat:"Giá cả",ko:"가격은 28,000원이에요",rom:"Gagyeogeun isippalcheonwoni-eyo",vi:"Giá là 28.000 won"},
  {id:"P03",cat:"Giá cả",ko:"배송비 포함된 가격인가요?",rom:"Baesongbi pohamdoen gagyeogingayo?",vi:"Giá này đã gồm phí ship chưa?"},
  {id:"P04",cat:"Giá cả",ko:"배송비는 별도예요",rom:"Baesongbineun byeoldoyeyo",vi:"Phí vận chuyển tính riêng"},
  {id:"P05",cat:"Giá cả",ko:"할인 가능한가요?",rom:"Halin ganeunghangayo?",vi:"Có giảm giá được không?"},
  {id:"S01",cat:"Vận chuyển",ko:"한국까지 얼마나 걸려요?",rom:"Hangukkkaji eolmana geollyeoyo?",vi:"Giao đến Hàn mất bao lâu?"},
  {id:"S02",cat:"Vận chuyển",ko:"보통 7~10일 정도 소요돼요",rom:"Botong chilil-eseo sipil jeongdo soyodwaeyo",vi:"Thường mất khoảng 7-10 ngày"},
  {id:"S03",cat:"Vận chuyển",ko:"베트남에서 직접 발송돼요",rom:"Beteuname-seo jikjeop balsongdwaeyo",vi:"Hàng gửi trực tiếp từ Việt Nam"},
  {id:"S04",cat:"Vận chuyển",ko:"관세가 따로 부과될 수 있어요",rom:"Gwansega ttaro bugwadoel su isseoyo",vi:"Có thể phát sinh phí hải quan riêng"},
  {id:"S05",cat:"Vận chuyển",ko:"트래킹 번호 보내드릴게요",rom:"Teuraekking beonho bonaedeurilgeyo",vi:"Mình sẽ gửi mã vận đơn cho bạn"},
  {id:"M01",cat:"Thanh toán",ko:"결제는 어떻게 하나요?",rom:"Gyeoljeneun eotteoke hanayo?",vi:"Thanh toán thế nào vậy?"},
  {id:"M02",cat:"Thanh toán",ko:"페이팔로 결제 가능해요",rom:"Peipallo gyeolje ganeunghaeyo",vi:"Có thể trả qua PayPal"},
  {id:"M03",cat:"Thanh toán",ko:"계좌이체도 가능해요",rom:"Gyejwaiachedo ganeunghaeyo",vi:"Chuyển khoản cũng được"},
  {id:"M04",cat:"Thanh toán",ko:"결제 확인 후 발송해드려요",rom:"Gyeolje hwagin hu balsonghaedeuryeoyo",vi:"Xác nhận thanh toán xong mình sẽ gửi hàng"},
  {id:"K01",cat:"Tồn kho/Size",ko:"재고 있나요?",rom:"Jaego innayo?",vi:"Còn hàng không?"},
  {id:"K02",cat:"Tồn kho/Size",ko:"네, 재고 있어요",rom:"Ne, jaego isseoyo",vi:"Có, còn hàng"},
  {id:"K03",cat:"Tồn kho/Size",ko:"죄송한데 품절이에요",rom:"Joesonghande pumjeori-eyo",vi:"Xin lỗi, hết hàng rồi"},
  {id:"K04",cat:"Tồn kho/Size",ko:"다른 색상도 있어요",rom:"Dareun saeksangdo isseoyo",vi:"Có màu khác nữa"},
  {id:"R01",cat:"Đổi trả",ko:"교환/환불 가능한가요?",rom:"Gyohwan/hwanbul ganeunghangayo?",vi:"Đổi/trả hàng được không?"},
  {id:"R02",cat:"Đổi trả",ko:"받으신 후 7일 내에 가능해요",rom:"Badeusin hu niril naee ganeunghaeyo",vi:"Được trong vòng 7 ngày sau khi nhận hàng"},
  {id:"R03",cat:"Đổi trả",ko:"해외 반품은 배송비를 고객님이 부담해요",rom:"Haeoe banpumeun baesongbireul gogaengnimi budamhaeyo",vi:"Hàng hoàn quốc tế khách tự chịu phí ship"},
  {id:"R04",cat:"Đổi trả",ko:"불량인 경우 전액 환불해드려요",rom:"Bullangin gyeongu jeonaek hwanbul haedeuryeoyo",vi:"Nếu lỗi hàng sẽ hoàn tiền toàn bộ"},
  {id:"C01",cat:"Chốt đơn",ko:"주문 도와드릴까요?",rom:"Jumun dowadeurilkkayo?",vi:"Mình giúp bạn đặt hàng nhé?"},
  {id:"C02",cat:"Chốt đơn",ko:"주소와 연락처 알려주세요",rom:"Jusowa yeonlakcheo allyeojuseyo",vi:"Cho mình xin địa chỉ và số liên hệ"},
  {id:"C03",cat:"Chốt đơn",ko:"구매해주셔서 감사합니다!",rom:"Gumaehajusyeoseo gamsahamnida!",vi:"Cảm ơn bạn đã mua hàng!"},
  {id:"B01",cat:"Da & hiệu quả",ko:"어떤 피부에 맞아요?",rom:"Eotteon pibue majayo?",vi:"Hợp với loại da nào?"},
  {id:"B02",cat:"Da & hiệu quả",ko:"건성 피부에 좋아요",rom:"Geonseong pibue joayo",vi:"Tốt cho da khô"},
  {id:"B03",cat:"Da & hiệu quả",ko:"지성 피부도 사용 가능해요",rom:"Jiseong pibudo sayong ganeunghaeyo",vi:"Da dầu cũng dùng được"},
  {id:"B04",cat:"Da & hiệu quả",ko:"민감성 피부도 안심하고 쓰셔도 돼요",rom:"Mingamseong pibudo ansimhago sseusyeodo dwaeyo",vi:"Da nhạy cảm dùng cũng yên tâm"},
  {id:"B05",cat:"Da & hiệu quả",ko:"무슨 효과가 있어요?",rom:"Museun hyogwaga isseoyo?",vi:"Có công dụng gì vậy?"},
  {id:"B06",cat:"Da & hiệu quả",ko:"미백 효과가 있어요",rom:"Mibaek hyogwaga isseoyo",vi:"Có tác dụng làm sáng da"},
  {id:"B07",cat:"Da & hiệu quả",ko:"보습에 좋아요",rom:"Boseube joayo",vi:"Tốt cho việc dưỡng ẩm"},
  {id:"B08",cat:"Da & hiệu quả",ko:"트러블(여드름) 진정에 도움돼요",rom:"Teureobeul (yeodeureum) jinjeonge doeumdwaeyo",vi:"Giúp làm dịu mụn"},
  {id:"U01",cat:"Cách dùng",ko:"어떻게 사용해요?",rom:"Eotteoke sayonghaeyo?",vi:"Dùng như thế nào?"},
  {id:"U02",cat:"Cách dùng",ko:"세안 후 토너 다음에 사용하세요",rom:"Sean hu toneo daeume sayonghaseyo",vi:"Sau khi rửa mặt, dùng sau toner"},
  {id:"U03",cat:"Cách dùng",ko:"아침저녁으로 사용 가능해요",rom:"Achimjeonyeogeuro sayong ganeunghaeyo",vi:"Dùng được sáng và tối"},
  {id:"U04",cat:"Cách dùng",ko:"적당량을 펴 발라주세요",rom:"Jeokdangnyangeur pyeo ballajuseyo",vi:"Lấy lượng vừa đủ và tán đều"},
  {id:"A01",cat:"An toàn",ko:"자극적이지 않나요?",rom:"Jageukjeogiji annayo?",vi:"Có gây kích ứng không?"},
  {id:"A02",cat:"An toàn",ko:"저자극 제품이에요",rom:"Jeojageuk jepumi-eyo",vi:"Đây là sản phẩm dịu nhẹ"},
  {id:"A03",cat:"An toàn",ko:"임산부도 사용 가능해요",rom:"Imsanbudo sayong ganeunghaeyo",vi:"Phụ nữ mang thai cũng dùng được"},
  {id:"A04",cat:"An toàn",ko:"피부과 테스트 완료된 제품이에요",rom:"Pibugwa teseuteu wanlyodoen jepumi-eyo",vi:"Sản phẩm đã được kiểm nghiệm da liễu"},
  {id:"D01",cat:"HSD/Xuất xứ",ko:"유통기한이 어떻게 되나요?",rom:"Yutongkihani eotteoke doenayo?",vi:"Hạn sử dụng đến khi nào?"},
  {id:"D02",cat:"HSD/Xuất xứ",ko:"제조일로부터 2년이에요",rom:"Jejeoillobuteo inyo-ni-eyo",vi:"2 năm từ ngày sản xuất"},
  {id:"D03",cat:"HSD/Xuất xứ",ko:"베트남에서 정식 수입된 제품이에요",rom:"Beteuname-seo jeongsik suipdoen jepumi-eyo",vi:"Sản phẩm nhập khẩu chính thức từ Việt Nam"},
  {id:"F01",cat:"Set/Mẫu",ko:"샘플도 있나요?",rom:"Saempeuldo innayo?",vi:"Có hàng mẫu/sample không?"},
  {id:"F02",cat:"Set/Mẫu",ko:"세트로 구매하면 더 저렴해요",rom:"Seteuro gumaehomyeon deo jeoryeomhaeyo",vi:"Mua theo set sẽ rẻ hơn"},
  {id:"F03",cat:"Set/Mẫu",ko:"선물용 포장 가능해요",rom:"Seonmulyong pojang ganeunghaeyo",vi:"Có thể gói quà tặng"}
];

// ========== CHAT API ==========
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Thiếu nội dung tin nhắn' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Chưa cấu hình API key' });

  const systemPrompt = `Bạn là trợ lý RAG cho người bán mỹ phẩm Việt Nam trả lời khách Hàn Quốc qua Instagram/DM.
Được cung cấp KHO NGỮ LIỆU gồm mẫu câu tiếng Hàn (ko), phiên âm (rom), và tiếng Việt (vi).

Nhiệm vụ:
1) Xác định các mục ngữ liệu liên quan nhất (theo id).
2) Soạn câu trả lời tiếng Hàn tự nhiên, lịch sự (diễn đạt lại, không chép y nguyên).
3) Tạo phiên âm Romanization cho toàn bộ câu trả lời tiếng Hàn.
4) Dịch sang tiếng Việt để seller hiểu và đọc được.
5) Nếu không có mục liên quan, vẫn trả lời lịch sự chung chung nhưng đặt out_of_corpus=true.

CHỈ trả về JSON đúng cấu trúc sau, KHÔNG kèm text khác, KHÔNG dùng markdown:
{"reply_korean": string, "reply_romanization": string, "reply_vietnamese": string, "used_ids": string[], "out_of_corpus": boolean}`;

  const userMsg = `KHO NGỮ LIỆU:\n${JSON.stringify(CORPUS)}\n\nCÂU HỎI KHÁCH HÀNG HÀN QUỐC:\n${message}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1200,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMsg }]
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const textBlock = (data.content || []).find(b => b.type === 'text');
    if (!textBlock) throw new Error('Không nhận được phản hồi từ AI');

    let clean = textBlock.text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    const usedCorpus = (parsed.used_ids || [])
      .map(id => CORPUS.find(c => c.id === id))
      .filter(Boolean);

    res.json({ ...parsed, usedCorpus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/corpus', (req, res) => res.json(CORPUS));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server chạy tại http://localhost:${PORT}`));
