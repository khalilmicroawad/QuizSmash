-- ============================================================================
-- QUIZ SMASH - 100 ACCESS CODES (13 FIGURES) FOR COURSE 1 (FIRST LEVEL)
-- Grants 100 Logins strictly for Course 1 (stage-1)
-- ============================================================================

-- 1. Create table if not exists
CREATE TABLE IF NOT EXISTS public.course_access_codes (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    allowed_course VARCHAR(50) NOT NULL DEFAULT 'stage-1',
    course_name VARCHAR(100) NOT NULL DEFAULT 'First Course (المرحلة الأولى)',
    max_logins INTEGER NOT NULL DEFAULT 100,
    used_logins INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    used_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    used_by_email TEXT,
    first_used_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create index for fast code lookup
CREATE INDEX IF NOT EXISTS idx_course_access_codes_code ON public.course_access_codes(code);
CREATE INDEX IF NOT EXISTS idx_course_access_codes_allowed_course ON public.course_access_codes(allowed_course);

-- 3. Enable Row Level Security
ALTER TABLE public.course_access_codes ENABLE ROW LEVEL SECURITY;

-- 4. Allow reading codes
DROP POLICY IF EXISTS "Allow select for all" ON public.course_access_codes;
CREATE POLICY "Allow select for all" ON public.course_access_codes
    FOR SELECT USING (true);

-- 5. Allow updating usage for authenticated users and anon
DROP POLICY IF EXISTS "Allow update usage" ON public.course_access_codes;
CREATE POLICY "Allow update usage" ON public.course_access_codes
    FOR UPDATE USING (true);

-- 6. Insert 100 13-figure codes for Course 1
INSERT INTO public.course_access_codes (code, allowed_course, course_name, max_logins, used_logins, is_active)
VALUES
  ('1876834539619', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8590957998946', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('3172703854816', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1550057226804', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('2317709149440', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1143114816291', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6081858644556', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4756068952573', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7037923317567', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('2434979863068', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8968367573571', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6962210132821', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9288654119953', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6736912165033', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6762052379525', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7794573062358', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7741622282169', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('2805650049887', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6038662035488', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('3050550464525', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4883313766721', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4749489683967', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5572342852157', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9348200274895', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('3736067820753', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4021806130380', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9998079785277', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('2452425493562', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8042206555688', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4357621242730', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5639885813226', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1829815690732', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('2935649958879', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8731194292247', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4833023539979', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8054649320522', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1717186558520', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7322835954347', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4969778232555', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8185084539021', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1649133944574', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9987483083601', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1349982707844', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8567686726207', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9867678881782', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5453543242890', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1726517761117', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5582724061973', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7523672824017', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9800321566457', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7611620966558', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7001734621418', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7064018046112', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6742965433906', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5839440981990', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9188072597844', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5057600995383', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4616544188222', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9804721632338', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8472832155490', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7775569530168', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('3634314135280', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5781129093551', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5951191516865', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4346905727460', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8076103932698', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1199620412160', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4625833378079', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8090979359056', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('2264044029691', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4781202172466', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5670670807433', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4728770800528', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8605545405043', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('3901054832716', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1299020707266', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5267615331445', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1189687956891', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5489530428629', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6604739357386', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9817874236104', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7585163535998', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1257020297927', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6301634377156', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('8469348165382', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6278514432917', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('2249000272105', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7931676867199', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9059910664831', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6634999247653', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('6198713655308', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4712482298909', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7846043767132', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7356846773280', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('9833315500055', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('4469162299897', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('1205797914684', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('7550968041548', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('2964699939778', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true),
  ('5763245089425', 'stage-1', 'First Course (المرحلة الأولى)', 100, 0, true)
ON CONFLICT (code) DO NOTHING;
