import { describe,expect,it } from 'vitest';
import { inquirySchema,productSchema } from './validation';

describe('inquirySchema',()=>{
  it('accepts a valid inquiry without an optional name',()=>{
    const result=inquirySchema.safeParse({name:'',phone:'010-1234-5678',company:'',inquiryType:'상품 문의',message:'상품 제작에 관해 문의드립니다.',privacyConsent:'on'});
    expect(result.success).toBe(true);
    if(result.success) expect(result.data.name).toBeNull();
  });

  it('rejects an inquiry without privacy consent',()=>{
    const result=inquirySchema.safeParse({phone:'010-1234-5678',inquiryType:'기타',message:'문의 내용입니다.',privacyConsent:'off'});
    expect(result.success).toBe(false);
  });
});

describe('productSchema',()=>{
  it('rejects slugs that are unsafe for URLs',()=>{
    const result=productSchema.safeParse({slug:'잘못된 슬러그',name:'상품',category:'파우치·가방',thumbnail_url:null,image_urls:[],alt_text:'제품 이미지',summary:'간단 설명',description:'상세 설명',smartstore_url:null,status:'available',is_visible:false,is_featured:false,sort_order:0});
    expect(result.success).toBe(false);
  });
});
